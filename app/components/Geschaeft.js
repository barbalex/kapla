'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
moment.locale('de')
import styles from './Geschaeft.css'
import isDateField from '../src/isDateField'
import validateDate from '../src/validateDate'
import AreaGeschaeft from '../containers/AreaGeschaeft'
import AreaNummern from '../containers/AreaNummern'
import AreaFristen from '../containers/AreaFristen'
import AreaParlVorstoss from '../containers/AreaParlVorstoss'
import AreaPersonen from '../containers/AreaPersonen'
import AreaHistory from '../containers/AreaHistory'
import AreaZuletztMutiert from '../containers/AreaZuletztMutiert'

class Geschaeft extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    activeId: PropTypes.number,
    geschaefteChangeState: PropTypes.func.isRequired,
    changeGeschaeftInDb: PropTypes.func.isRequired,
    geschaefteLayout: PropTypes.object.isRequired,
    geschaeftToggleActivated: PropTypes.func.isRequired
  }

  onChangeDatePicker = (name, e, picker) => {
    const rVal = {
      target: {
        type: 'text',
        name,
        value: picker.startDate
      }
    }
    this.blur(rVal)
  }

  change = (e) => {
    const { activeId, geschaefteChangeState } = this.props
    const { type, name, dataset } = e.target
    let { value } = e.target
    if (type === 'radio') {
      value = dataset.value
      // blur does not occur in radio
      this.blur(e)
    }
    geschaefteChangeState(activeId, name, value)
  }

  blur = (e) => {
    const { activeId, changeGeschaeftInDb, geschaefteChangeState } = this.props
    const { type, name, dataset } = e.target
    let { value } = e.target
    let select = false
    if (type === 'radio') value = dataset.value
    if (isDateField(name)) {
      if (validateDate(value)) {
        // if correct date, save to db
        changeGeschaeftInDb(activeId, name, value)
      }
      // else: give user hint
      let value2 = ''
      if (value) value2 = moment(value, 'DD.MM.YYYY').format('DD.MM.YYYY')
      if (value2.includes('Invalid date')) {
        select = true
        value2 = value2.replace('Invalid date', 'Format: DD.MM.YYYY')
      }
      geschaefteChangeState(activeId, name, value2)
      // and set focus back into the input
      if (select) {
        // need timeout for it to work
        setTimeout(() => {
          ReactDOM.findDOMNode(this.refs[name]).select()
        }, 0)
      }
    } else {
      changeGeschaeftInDb(activeId, name, value)
    }
  }

  render = () => {
    const {
      geschaeft,
      geschaefteLayout
    } = this.props

    // return immediately if no geschaeft
    const showGeschaeft = geschaeft && geschaeft.idGeschaeft
    if (!showGeschaeft) return null

    // need width to set layout for differing widths
    const geschaefteLayoutWidth = geschaefteLayout.width
    const geschaeftWidthPercent = geschaefteLayout.config.content[0].content[1].width
    const totalWidth = geschaefteLayoutWidth * geschaeftWidthPercent / 100
    const wrapperClass = totalWidth < 750 ? styles.wrapperNarrow : styles.wrapperWide
    const nrOfGFields = 10
    const nrOfNrFields = 10
    const nrOfFieldsBeforePv = nrOfGFields + nrOfNrFields
    const nrOfPvFields = 9
    const nrOfFieldsBeforeFristen = nrOfFieldsBeforePv + nrOfPvFields
    const nrOfFieldsBeforePersonen = nrOfFieldsBeforeFristen + 7

    return (
      <div className={wrapperClass}>
        <AreaGeschaeft
          wrapperClass={wrapperClass}
          nrOfGFields={nrOfGFields}
          change={this.change}
          blur={this.blur}
        />
        <AreaNummern
          wrapperClass={wrapperClass}
          nrOfGFields={nrOfGFields}
          change={this.change}
          blur={this.blur}
        />
        <AreaParlVorstoss
          nrOfFieldsBeforePv={nrOfFieldsBeforePv}
          change={this.change}
          blur={this.blur}
        />
        <AreaFristen
          nrOfFieldsBeforeFristen={nrOfFieldsBeforeFristen}
          change={this.change}
          blur={this.blur}
          onChangeDatePicker={this.onChangeDatePicker}
        />
        <AreaPersonen
          nrOfFieldsBeforePersonen={nrOfFieldsBeforePersonen}
          change={this.change}
          blur={this.blur}
        />
        <AreaHistory
          blur={this.blur}
          change={this.change}
        />
        <AreaZuletztMutiert />
        {/* need this so lowest fields are visible */}
        <div style={{ height: 52 }} />
      </div>
    )
  }
}

export default Geschaeft
