'use strict'

import React, { Component, PropTypes } from 'react'
import moment from 'moment'
moment.locale('de')
import $ from 'jquery'
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
        comparator: PropTypes.oneOf(['=', '===', '!==', '<', '>', '']),
        field: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
      })
    ).isRequired,
    geschaefteFilterByFields: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
  }

  onChangeDatePicker = (name, e, picker) => {
    const rVal = {
      target: {
        type: 'text',
        name,
        value: picker.startDate
      }
    }
    this.change(rVal)
  }

  changeComparator = (value, name) => {
    const { filterFields, geschaefteFilterByFields } = this.props
    const newFilterFields = []
    let changedField = {
      comparator: '=',
      field: name,
      value: null,
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
    changedField.comparator = value
    newFilterFields.push(changedField)
    geschaefteFilterByFields(newFilterFields)
  }

  change = (e) => {
    const {
      filterFields,
      geschaefteFilterByFields,
    } = this.props
    const {
      type,
      name,
      dataset,
    } = e.target
    const newFilterFields = []
    let changedField = {
      comparator: '=',
      field: name,
      value: null,
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
    // console.log('FilterFields, value on change:', value)
    if (isDateField(name) && value) {
      value = moment(value, 'DD.MM.YYYY').format('YYYY-MM-DD')
    }
    if (type === 'radio') {
      value = dataset.value
    }
    changedField.value = value
    newFilterFields.push(changedField)
    geschaefteFilterByFields(newFilterFields)
  }

  render = () => {
    const {
      values,
      config,
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

    // need width to adapt layout to differing widths
    const windowWidth = $(window).width()
    const areaFilterFieldsWidth = (
      windowWidth *
      (100 - config.geschaefteColumnWidth) /
      100
    )
    const wrapperClassBaseString = (
      areaFilterFieldsWidth < 750 ?
      'wrapperNarrow' :
      'wrapperWide'
    )

    // layout needs to work with or without area for geschaeftsart
    const wrapperClassString = (
      showAreaForGeschaeftsart ?
      wrapperClassBaseString :
      `${wrapperClassBaseString}NoAreaForGeschaeftsart`
    )
    const wrapperClass = styles[wrapperClassString]

    // prepare tab indexes
    const nrOfGFields = 10
    const nrOfNrFields = 11
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
            changeComparator={this.changeComparator}
            values={values}
          />
          <AreaNummern
            wrapperClass={wrapperClass}
            nrOfGFields={nrOfGFields}
            change={this.change}
            changeComparator={this.changeComparator}
            values={values}
          />
          {
            showAreaParlVorstoss &&
            <AreaParlVorstoss
              nrOfFieldsBeforePv={nrOfFieldsBeforePv}
              change={this.change}
              changeComparator={this.changeComparator}
              values={values}
            />
          }
          {
            showAreaRechtsmittel &&
            <AreaRechtsmittel
              nrOfFieldsBeforePv={nrOfFieldsBeforePv}
              change={this.change}
              onChangeDatePicker={this.onChangeDatePicker}
              changeComparator={this.changeComparator}
              values={values}
            />
          }
          <AreaFristen
            nrOfFieldsBeforeFristen={nrOfFieldsBeforeFristen}
            change={this.change}
            changeComparator={this.changeComparator}
            values={values}
          />
          <AreaPersonen
            nrOfFieldsBeforePersonen={nrOfFieldsBeforePersonen}
            change={this.change}
            changeComparator={this.changeComparator}
            values={values}
          />
          <AreaHistory
            nrOfFieldsBeforeHistory={nrOfFieldsBeforeHistory}
            change={this.change}
            changeComparator={this.changeComparator}
            values={values}
          />
          <AreaZuletztMutiert
            nrOfFieldsBeforeZuletztMutiert={nrOfFieldsBeforeZuletztMutiert}
            change={this.change}
            changeComparator={this.changeComparator}
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
