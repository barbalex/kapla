'use strict'

import React, { PropTypes } from 'react'
import {
  FormGroup,
  InputGroup,
  FormControl,
  ControlLabel,
  Glyphicon
} from 'react-bootstrap'
import moment from 'moment'
moment.locale('de')
import DateRangePicker from 'react-bootstrap-daterangepicker'
import styles from './AreaFristen.css'
import getDateValidationStateDate from '../../src/getDateValidationStateDate'

const AreaFristen = ({
  values,
  nrOfFieldsBeforeFristen,
  change,
  onChangeDatePicker
}) => {
  /**
   * need to give addon no padding
   * and the originally addon's padding to the glyphicon
   * to make entire addon clickable
   * for opening calendar
   */
  const datePickerAddonStyle = {
    padding: 0
  }
  const datePickerCalendarStyle = {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12
  }

  return (
    <div className={styles.areaFristen}>
      <div className={styles.areaFristenTitle}>
        Fristen
      </div>
      <FormGroup
        className={styles.fieldDatumEingangAwel}
        validationState={getDateValidationStateDate(values.datumEingangAwel)}
      >
        <ControlLabel>
          Datum des Eingangs im AWEL
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={values.datumEingangAwel}
            name="datumEingangAwel"
            onChange={change}
            bsSize="small"
            tabIndex={1 + nrOfFieldsBeforeFristen}
          />
          <InputGroup.Addon style={datePickerAddonStyle}>
            <DateRangePicker
              singleDatePicker
              drops="up"
              opens="left"
              onApply={onChangeDatePicker.bind(this, 'datumEingangAwel')}
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
      <FormGroup
        className={styles.fieldFristAwel}
        validationState={getDateValidationStateDate(values.fristAwel)}
      >
        <ControlLabel>
          Frist für Erledigung durch AWEL
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={values.fristAwel || ''}
            name="fristAwel"
            onChange={change}
            bsSize="small"
            tabIndex={2 + nrOfFieldsBeforeFristen}
          />
          <InputGroup.Addon style={datePickerAddonStyle}>
            <DateRangePicker
              singleDatePicker
              drops="up"
              opens="left"
              onApply={onChangeDatePicker.bind(this, 'fristAwel')}
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
      <FormGroup
        className={styles.fieldFristAmtschef}
        validationState={getDateValidationStateDate(values.fristAmtschef)}
      >
        <ControlLabel>
          Frist Vorlage an Amtschef
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={values.fristAmtschef || ''}
            name="fristAmtschef"
            onChange={change}
            bsSize="small"
            tabIndex={3 + nrOfFieldsBeforeFristen}
          />
          <InputGroup.Addon style={datePickerAddonStyle}>
            <DateRangePicker
              singleDatePicker
              drops="up"
              opens="left"
              onApply={onChangeDatePicker.bind(this, 'fristAmtschef')}
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
      <FormGroup
        className={styles.fieldFristAbteilung}
        validationState={getDateValidationStateDate(values.fristAbteilung)}
      >
        <ControlLabel>
          Frist für Erledigung durch Abteilung
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={values.fristAbteilung || ''}
            name="fristAbteilung"
            onChange={change}
            bsSize="small"
            tabIndex={4 + nrOfFieldsBeforeFristen}
          />
          <InputGroup.Addon style={datePickerAddonStyle}>
            <DateRangePicker
              singleDatePicker
              drops="up"
              opens="left"
              onApply={onChangeDatePicker.bind(this, 'fristAbteilung')}
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
      <FormGroup
        className={styles.fieldFristMitarbeiter}
        validationState={getDateValidationStateDate(values.fristMitarbeiter)}
      >
        <ControlLabel>
          Frist Erledigung nächster Schritt Re
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={values.fristMitarbeiter || ''}
            name="fristMitarbeiter"
            onChange={change}
            bsSize="small"
            tabIndex={5 + nrOfFieldsBeforeFristen}
          />
          <InputGroup.Addon style={datePickerAddonStyle}>
            <DateRangePicker
              singleDatePicker
              drops="up"
              opens="left"
              onApply={onChangeDatePicker.bind(this, 'fristMitarbeiter')}
              className={styles.datePicker}
            >
              <Glyphicon glyph="calendar" style={datePickerCalendarStyle} />
            </DateRangePicker>
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      <FormGroup
        className={styles.fieldDatumAusgangAwel}
        validationState={getDateValidationStateDate(values.datumAusgangAwel)}
      >
        <ControlLabel>
          Datum Ausgang AWEL (erledigt)
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={values.datumAusgangAwel || ''}
            name="datumAusgangAwel"
            onChange={change}
            bsSize="small"
            tabIndex={6 + nrOfFieldsBeforeFristen}
          />
          <InputGroup.Addon style={datePickerAddonStyle}>
            <DateRangePicker
              singleDatePicker
              drops="up"
              opens="left"
              onApply={onChangeDatePicker.bind(this, 'datumAusgangAwel')}
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
      <FormGroup
        className={styles.fieldFristDirektion}
        validationState={getDateValidationStateDate(values.fristDirektion)}
      >
        <ControlLabel>
          Frist für Erledigung durch Direktion
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={values.fristDirektion || ''}
            name="fristDirektion"
            onChange={change}
            bsSize="small"
            tabIndex={7 + nrOfFieldsBeforeFristen}
          />
          <InputGroup.Addon style={datePickerAddonStyle}>
            <DateRangePicker
              singleDatePicker
              drops="up"
              opens="left"
              onApply={onChangeDatePicker.bind(this, 'fristDirektion')}
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
    </div>
  )
}

AreaFristen.displayName = 'AreaFristen'

AreaFristen.propTypes = {
  values: PropTypes.object,
  change: PropTypes.func.isRequired,
  onChangeDatePicker: PropTypes.func.isRequired,
  nrOfFieldsBeforeFristen: PropTypes.number
}

export default AreaFristen
