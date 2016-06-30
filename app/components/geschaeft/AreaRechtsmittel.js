'use strict'

import React, { PropTypes } from 'react'
import {
  FormGroup,
  FormControl,
  InputGroup,
  ControlLabel,
  Glyphicon,
} from 'react-bootstrap'
import moment from 'moment'
moment.locale('de')
import DateRangePicker from 'react-bootstrap-daterangepicker'
import styles from './areaRechtsmittel.css'
import createOptions from '../../src/createOptions'
import getDateValidationStateDate from '../../src/getDateValidationStateDate'

const AreaRechtsmittel = ({
  geschaeft,
  rechtsmittelErledigungOptions,
  rechtsmittelInstanzOptions,
  nrOfFieldsBeforePv,
  change,
  blur,
  onChangeDatePicker,
}) => {
  /**
   * need to give addon no padding
   * and the originally addon's padding to the glyphicon
   * to make entire addon clickable
   * for opening calendar
   */
  const datePickerAddonStyle = {
    padding: 0,
  }
  const datePickerCalendarStyle = {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
  }

  return (
    <div className={styles.areaForGeschaeftsart}>
      <div className={styles.areaRechtsmittelTitle}>
        Rekurs / Beschwerde
      </div>
      <div className={styles.fieldInstanz}>
        <ControlLabel>
          Instanz
        </ControlLabel>
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
        <ControlLabel>
          Entscheid Nr.
        </ControlLabel>
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
        <ControlLabel>
          Entscheid Datum
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={geschaeft.rechtsmittelEntscheidDatum || ''}
            name="rechtsmittelEntscheidDatum"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={3 + nrOfFieldsBeforePv}
          />
          <InputGroup.Addon style={datePickerAddonStyle}>
            <DateRangePicker
              singleDatePicker
              drops="up"
              opens="left"
              onApply={onChangeDatePicker.bind(this, 'rechtsmittelEntscheidDatum')}
              className={styles.datePicker}
            >
              <Glyphicon
                glyph="calendar"
                style={datePickerCalendarStyle}
              />
            </DateRangePicker>
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      <div className={styles.fieldErledigung}>
        <ControlLabel>
          Erledigung
        </ControlLabel>
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

AreaRechtsmittel.displayName = 'AreaRechtsmittel'

AreaRechtsmittel.propTypes = {
  geschaeft: PropTypes.object.isRequired,
  rechtsmittelErledigungOptions: PropTypes.array,
  rechtsmittelInstanzOptions: PropTypes.array,
  nrOfFieldsBeforePv: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  onChangeDatePicker: PropTypes.func.isRequired,
}

export default AreaRechtsmittel
