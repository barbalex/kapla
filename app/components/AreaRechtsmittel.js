'use strict'

import React, { Component, PropTypes } from 'react'
import { FormGroup, FormControl, InputGroup, ControlLabel, Glyphicon } from 'react-bootstrap'
import moment from 'moment'
moment.locale('de')
import DateRangePicker from 'react-bootstrap-daterangepicker'
import styles from './AreaRechtsmittel.css'
import createOptions from '../src/createOptions'
import getDateValidationStateDate from '../src/getDateValidationStateDate'

class AreaRechtsmittel extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    rechtsmittelErledigungOptions: PropTypes.array.isRequired,
    rechtsmittelInstanzOptions: PropTypes.array.isRequired,
    nrOfFieldsBeforePv: PropTypes.number,
    change: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired,
    onChangeDatePicker: PropTypes.func.isRequired
  }

  render = () => {
    const {
      geschaeft,
      rechtsmittelErledigungOptions,
      rechtsmittelInstanzOptions,
      nrOfFieldsBeforePv,
      change,
      blur,
      onChangeDatePicker
    } = this.props

    return (
      <div className={styles.areaForGeschaeftsart}>
        <div className={styles.areaRechtsmittelTitle}>Rekurs / Beschwerde</div>
        <div className={styles.fieldInstanz}>
          <ControlLabel>Instanz</ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.rechtsmittelInstanz || ''}
            name="rechtsmittelInstanz"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={1 + nrOfFieldsBeforePv}
          >
            {createOptions(rechtsmittelInstanzOptions)}
          </FormControl>
        </div>
        <div className={styles.fieldEntscheidNr}>
          <ControlLabel>Entscheid Nr.</ControlLabel>
          <FormControl
            type="number"
            value={geschaeft.rechtsmittelEntscheidNr || ''}
            name="rechtsmittelEntscheidNr"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={2 + nrOfFieldsBeforePv}
          />
        </div>
        <FormGroup
          className={styles.fieldEntscheidDatum}
          validationState={getDateValidationStateDate(geschaeft.rechtsmittelEntscheidDatum)}
        >
          <ControlLabel>Entscheid Datum</ControlLabel>
          <InputGroup>
            <FormControl
              type="text"
              value={geschaeft.rechtsmittelEntscheidDatum || ''}
              name="rechtsmittelEntscheidDatum"
              ref="rechtsmittelEntscheidDatum"
              onChange={change}
              onBlur={blur}
              bsSize="small"
              tabIndex={3 + nrOfFieldsBeforePv}
            />
            <InputGroup.Addon>
              <DateRangePicker
                singleDatePicker
                drops="up"
                onApply={onChangeDatePicker.bind(this, 'rechtsmittelEntscheidDatum')}
                className={styles.datePicker}
              >
                <Glyphicon glyph="calendar" />
              </DateRangePicker>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <div className={styles.fieldErledigung}>
          <ControlLabel>Erledigung</ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.rechtsmittelErledigung || ''}
            name="rechtsmittelErledigung"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={4 + nrOfFieldsBeforePv}
          >
            {createOptions(rechtsmittelErledigungOptions)}
          </FormControl>
        </div>
      </div>
    )
  }
}

export default AreaRechtsmittel
