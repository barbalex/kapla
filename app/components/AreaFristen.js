'use strict'

import React, { Component, PropTypes } from 'react'
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
import getDateValidationStateDate from '../src/getDateValidationStateDate'


const statusFristInStyle = (dauerBisFristMitarbeiter) => {
  if (dauerBisFristMitarbeiter < 0) {
    return [styles.fieldFristInUeberfaellig, 'formControlStatic'].join(' ')
  }
  if (dauerBisFristMitarbeiter === 0) {
    return [styles.fieldFristInHeute, 'formControlStatic'].join(' ')
  }
  return 'formControlStatic'
}

const fristDauerBisMitarbeiter = (geschaeft) => {
  const now = moment()
  const end = moment(geschaeft.fristMitarbeiter, 'DD.MM.YYYY')
  const duration = moment.duration(end.diff(now))
  const days = duration.asDays()
  return days ? Math.ceil(days) : ''
}

const fieldFristDauerBisMitarbeiter = (geschaeft) => (
  <div className={styles.fieldFristDauerBisMitarbeiter}>
    <ControlLabel>
      Tage bis Frist Mitarbeiter
    </ControlLabel>
    <FormControl.Static
      style={{ paddingTop: 0, marginTop: 0 }}
      className={statusFristInStyle(fristDauerBisMitarbeiter(geschaeft))}
    >
      {fristDauerBisMitarbeiter(geschaeft)}
    </FormControl.Static>
  </div>
)

const AreaFristen = ({
  geschaeft,
  nrOfFieldsBeforeFristen,
  change,
  blur,
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
        validationState={getDateValidationStateDate(geschaeft.datumEingangAwel)}
      >
        <ControlLabel>
          Datum des Eingangs im AWEL
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={geschaeft.datumEingangAwel}
            name="datumEingangAwel"
            onChange={change}
            onBlur={blur}
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
        validationState={getDateValidationStateDate(geschaeft.fristAwel)}
      >
        <ControlLabel>
          Frist für Erledigung durch AWEL
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={geschaeft.fristAwel || ''}
            name="fristAwel"
            onChange={change}
            onBlur={blur}
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
        validationState={getDateValidationStateDate(geschaeft.fristAmtschef)}
      >
        <ControlLabel>
          Frist Vorlage an Amtschef
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={geschaeft.fristAmtschef || ''}
            name="fristAmtschef"
            onChange={change}
            onBlur={blur}
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
        validationState={getDateValidationStateDate(geschaeft.fristAbteilung)}
      >
        <ControlLabel>
          Frist für Erledigung durch Abteilung
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={geschaeft.fristAbteilung || ''}
            name="fristAbteilung"
            onChange={change}
            onBlur={blur}
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
        validationState={getDateValidationStateDate(geschaeft.fristMitarbeiter)}
      >
        <ControlLabel>
          Frist Erledigung nächster Schritt RD
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={geschaeft.fristMitarbeiter || ''}
            name="fristMitarbeiter"
            onChange={change}
            onBlur={blur}
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
      {!!geschaeft.fristMitarbeiter && fieldFristDauerBisMitarbeiter(geschaeft)}
      <FormGroup
        className={styles.fieldDatumAusgangAwel}
        validationState={getDateValidationStateDate(geschaeft.datumAusgangAwel)}
      >
        <ControlLabel>
          Datum Ausgang AWEL (erledigt)
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={geschaeft.datumAusgangAwel || ''}
            name="datumAusgangAwel"
            onChange={change}
            onBlur={blur}
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
        validationState={getDateValidationStateDate(geschaeft.fristDirektion)}
      >
        <ControlLabel>
          Frist für Erledigung durch Direktion
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={geschaeft.fristDirektion || ''}
            name="fristDirektion"
            onChange={change}
            onBlur={blur}
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
  geschaeft: PropTypes.object,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  onChangeDatePicker: PropTypes.func.isRequired,
  nrOfFieldsBeforeFristen: PropTypes.number
}

export default AreaFristen
