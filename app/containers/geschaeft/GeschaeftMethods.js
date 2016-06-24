'use strict'

import React, { Component, PropTypes } from 'react'
import moment from 'moment'
moment.locale('de')
import Geschaeft from '../../components/geschaeft/Geschaeft'
import isDateField from '../../src/isDateField'
import validateDate from '../../src/validateDate'

class GeschaeftMethods extends Component {
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
    blur(rVal)
  }

  change = (e) => {
    const { activeId, geschaefteChangeState } = this.props
    const { type, name, dataset } = e.target
    let { value } = e.target
    if (type === 'radio') {
      value = dataset.value
      // blur does not occur in radio
      blur(e)
    }
    geschaefteChangeState(activeId, name, value)
  }

  blur = (e) => {
    const { changeGeschaeftInDb, activeId, geschaefteChangeState } = this.props
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
        /* TODO:
        setTimeout(() => {
          ReactDOM.findDOMNode(this.refs[name]).select()
        }, 0)
        */
      }
    } else {
      changeGeschaeftInDb(activeId, name, value)
    }
  }

  render = () => {
    const newProps = {
      onChangeDatePicker: this.onChangeDatePicker,
      change: this.change,
      blur: this.blur
    }

    return <Geschaeft {...this.props} {...newProps} />
  }
}

export default GeschaeftMethods

