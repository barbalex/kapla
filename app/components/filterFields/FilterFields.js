'use strict'

import React, { Component, PropTypes } from 'react'
import moment from 'moment'
moment.locale('de')
import styles from './filterFields.css'
import AreaGeschaeft from '../../containers/filterFields/AreaGeschaeft'
import AreaNummern from '../../containers/filterFields/AreaNummern'
import AreaFristen from '../../containers/filterFields/AreaFristen'
import AreaParlVorstoss from '../../containers/filterFields/AreaParlVorstoss'
import AreaRechtsmittel from '../../containers/filterFields/AreaRechtsmittel'
import AreaPersonen from '../../containers/filterFields/AreaPersonen'
import AreaHistory from '../../containers/filterFields/AreaHistory'
import AreaZuletztMutiert from '../../containers/filterFields/AreaZuletztMutiert'
import isDateField from '../../src/isDateField'

class FilterFields extends Component {
  static propTypes = {
    values: PropTypes.object.isRequired,
    filterFields: PropTypes.arrayOf(
      PropTypes.shape({
        comparator: PropTypes.oneOf(['=', '===', '!==', '<', '<=', '>', '>=']),
        field: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
      })
    ).isRequired,
    geschaefteFilterByFields: PropTypes.func.isRequired,
    geschaefteLayout: PropTypes.object.isRequired
  }

  onChangeDatePicker = (name, e, picker) => {
    const datePassed = picker.startDate
    const value = moment(datePassed).format('YYYY-MM-DD')
    // const value = moment(datePassed).format('DD.MM.YYYY')
    const rVal = {
      target: {
        type: 'text',
        name,
        value
      }
    }
    this.change(rVal)
  }

  changeComparator = (e) => {
    const { filterFields, geschaefteFilterByFields } = this.props
    const { name, value } = e.target
    const newFilterFields = []
    let changedField = {
      comparator: '=',
      field: null,
      value: null
    }
    if (filterFields.forEach) {
      filterFields.forEach((f) => {
        if (f.field !== name) {
          newFilterFields.push(f)
        } else {
          changedField = f
        }
      })
    }
    changedField.name = name
    changedField.comparator = value
    newFilterFields.push(changedField)
    geschaefteFilterByFields(newFilterFields)
  }

  change = (e) => {
    const { filterFields, geschaefteFilterByFields } = this.props
    const { type, name, dataset } = e.target
    const newFilterFields = []
    let changedField = {
      comparator: '=',
      field: null,
      value: null
    }
    if (filterFields.forEach) {
      filterFields.forEach((f) => {
        if (f.field !== name) {
          newFilterFields.push(f)
        } else if (f.comparator) {
          changedField = f
        }
      })
    }
    let { value } = e.target
    if (isDateField(name) && value) {
      value = moment(value).format('DD.MM.YYYY')
    }
    if (type === 'radio') {
      value = dataset.value
    }
    changedField.field = name
    changedField.value = value
    newFilterFields.push(changedField)
    geschaefteFilterByFields(newFilterFields)
  }

  render = () => {
    const {
      values,
      geschaefteLayout
    } = this.props

    const showAreaParlVorstoss = (
      values.geschaeftsart &&
      values.geschaeftsart === 'Parlament. Vorstoss'
    )
    const showAreaRechtsmittel = (
      values.geschaeftsart &&
      values.geschaeftsart === 'Rekurs/Beschwerde'
    )
    const showAreaForGeschaeftsart = (
      showAreaParlVorstoss ||
      showAreaRechtsmittel
    )

    // need width to set layout for differing widths
    const geschaefteLayoutWidth = geschaefteLayout.width
    const geschaeftWidthPercent = geschaefteLayout.config.content[0].content[1].width
    const totalWidth = geschaefteLayoutWidth * geschaeftWidthPercent / 100
    const wrapperClassBaseString = totalWidth < 750 ? 'wrapperNarrow' : 'wrapperWide'
    // layout needs to work with or without area for geschaeftsart
    const wrapperClassString = (
      showAreaForGeschaeftsart ?
      wrapperClassBaseString :
      `${wrapperClassBaseString}NoAreaForGeschaeftsart`
    )
    const wrapperClass = styles[wrapperClassString]
    // prepare tab indexes
    const nrOfGFields = 10
    const nrOfNrFields = 10
    const nrOfFieldsBeforePv = nrOfGFields + nrOfNrFields
    const nrOfPvFields = 9
    const nrOfFieldsBeforeFristen = nrOfFieldsBeforePv + nrOfPvFields
    const nrOfFieldsBeforePersonen = nrOfFieldsBeforeFristen + 7
    const nrOfFieldsBeforeHistory = nrOfFieldsBeforePersonen + 3
    const nrOfFieldsBeforeZuletztMutiert = nrOfFieldsBeforeHistory + 1

    return (
      <div className={styles.scrollContainer}>
        <div className={wrapperClass}>
          <AreaGeschaeft
            wrapperClass={wrapperClass}
            nrOfGFields={nrOfGFields}
            change={this.change}
            values={values}
          />
          <AreaNummern
            wrapperClass={wrapperClass}
            nrOfGFields={nrOfGFields}
            change={this.change}
            values={values}
          />
          {
            showAreaParlVorstoss &&
            <AreaParlVorstoss
              nrOfFieldsBeforePv={nrOfFieldsBeforePv}
              change={this.change}
              values={values}
            />
          }
          {
            showAreaRechtsmittel &&
            <AreaRechtsmittel
              nrOfFieldsBeforePv={nrOfFieldsBeforePv}
              change={this.change}
              onChangeDatePicker={this.onChangeDatePicker}
              values={values}
            />
          }
          <AreaFristen
            nrOfFieldsBeforeFristen={nrOfFieldsBeforeFristen}
            change={this.change}
            changeComparator={this.changeComparator}
            onChangeDatePicker={this.onChangeDatePicker}
            values={values}
          />
          <AreaPersonen
            nrOfFieldsBeforePersonen={nrOfFieldsBeforePersonen}
            change={this.change}
            values={values}
          />
          <AreaHistory
            nrOfFieldsBeforeHistory={nrOfFieldsBeforeHistory}
            change={this.change}
            values={values}
          />
          <AreaZuletztMutiert
            nrOfFieldsBeforeZuletztMutiert={nrOfFieldsBeforeZuletztMutiert}
            change={this.change}
            values={values}
          />
          {/* need this so lowest fields are visible */}
          <div style={{ height: 52 }} />
        </div>
      </div>
    )
  }
}

export default FilterFields
