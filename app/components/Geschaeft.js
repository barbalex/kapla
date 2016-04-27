'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { FormGroup, InputGroup, FormControl, ControlLabel, Radio, Glyphicon } from 'react-bootstrap'
import moment from 'moment'
moment.locale('de')
import DateRangePicker from 'react-bootstrap-daterangepicker'
import styles from './Geschaeft.css'
import isDateField from '../src/isDateField'
import GeschaeftKontakteIntern from '../containers/GeschaeftKontakteIntern'
import GeschaeftKontakteExtern from '../containers/GeschaeftKontakteExtern'

class Geschaeft extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    activeId: PropTypes.number,
    geschaefteChangeState: PropTypes.func.isRequired,
    changeGeschaeftInDb: PropTypes.func.isRequired,
    rechtsmittelerledigungOptions: PropTypes.array.isRequired,
    parlVorstossTypOptions: PropTypes.array.isRequired,
    interneOptions: PropTypes.array,
    externeOptions: PropTypes.array,
    statusOptions: PropTypes.array.isRequired,
    geschaeftsartOptions: PropTypes.array.isRequired,
    geschaefteLayout: PropTypes.object.isRequired
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

  getDateValidationStateDate = (date) => {
    switch (this.validateDate(date)) {
      case true:
        return null
      case false:
        return 'error'
      default:
        return null
    }
  }

  validateDate = (date) => {
    if (!date) return true
    return moment(date, 'DD.MM.YYYY').isValid()
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
      if (this.validateDate(value)) {
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

  options = (values) => {
    const options = values.map((val, index) => <option key={index + 1} value={val}>{val}</option>)
    options.unshift(<option key={0} value=""></option>)
    return options
  }

  fristDauerBisMitarbeiter = () => {
    const { geschaeft } = this.props
    const now = moment()
    const end = moment(geschaeft.fristMitarbeiter, 'DD.MM.YYYY')
    const duration = moment.duration(end.diff(now))
    const days = duration.asDays()
    return days ? Math.ceil(days) : ''
  }

  verantwortlichData = () => {
    const { geschaeft, interneOptions } = this.props
    const data = interneOptions.find((o) => o.kurzzeichen === geschaeft.verantwortlich)
    if (!data) return ''
    const name = `${data.vorname} ${data.name}`
    const abt = data.abteilung ? `, ${data.abteilung}` : null
    const eMail = data.eMail ? `, ${data.eMail}` : null
    const telefon = data.telefon ? `, ${data.telefon}` : null
    return `${name}${abt}${eMail}${telefon}`
  }

  render() {
    const {
      geschaeft,
      rechtsmittelerledigungOptions,
      parlVorstossTypOptions,
      statusOptions,
      geschaeftsartOptions,
      geschaefteLayout,
      interneOptions
    } = this.props

    // need width to set layout for differing widths
    const geschaefteLayoutWidth = geschaefteLayout.width
    const geschaeftWidthPercent = geschaefteLayout.config.content[0].content[1].width
    const totalWidth = geschaefteLayoutWidth * geschaeftWidthPercent / 100
    const wrapperClass = totalWidth < 750 ? styles.wrapperNarrow : styles.wrapperWide
    const showGeschaeft = geschaeft && geschaeft.idGeschaeft
    const nrOfGFields = 10
    const nrOfNrFields = 10
    const nrOfFieldsBeforePv = nrOfGFields + nrOfNrFields
    const nrOfPvFields = 9
    const nrOfFieldsBeforeFristen = nrOfFieldsBeforePv + nrOfPvFields
    const nrOfFieldsBeforePersonen = nrOfFieldsBeforeFristen + 7

    if (!showGeschaeft) return null

    return (
      <div className={wrapperClass}>
        <div className={styles.areaGeschaeft}>
          <div className={styles.fieldGegenstand}>
            <div className={styles.areaGeschaeftTitle}>Geschäft</div>
            <ControlLabel>Gegenstand</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={geschaeft.gegenstand || ''}
              name="gegenstand"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={[styles.input, styles.gegenstand].join(' ')}
              tabIndex={1 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
              autoFocus={wrapperClass !== styles.wrapperNarrow}
            />
          </div>
          <div className={styles.fieldOrt}>
            <ControlLabel>Ort</ControlLabel>
            <FormControl
              type="text"
              value={geschaeft.ort || ''}
              name="ort"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.input}
              tabIndex={2 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            />
          </div>
          <div className={styles.fieldGeschaeftsart}>
            <ControlLabel className={styles.label}>Geschäftsart</ControlLabel>
            <FormControl
              componentClass="select"
              value={geschaeft.geschaeftsart || ''}
              name="geschaeftsart"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.input}
              tabIndex={3 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            >
              {this.options(geschaeftsartOptions)}
            </FormControl>
          </div>
          <div className={styles.fieldStatus}>
            <ControlLabel className={styles.label}>Status</ControlLabel>
            <FormControl
              componentClass="select"
              value={geschaeft.status || ''}
              name="status"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.input}
              tabIndex={4 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            >
              {this.options(statusOptions)}
            </FormControl>
          </div>
          <div className={styles.fieldVorgeschaeft}>
            <ControlLabel className={styles.label}>Vorgeschäft</ControlLabel>
            <FormControl
              type="number"
              value={geschaeft.idVorgeschaeft || ''}
              name="idVorgeschaeft"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={[styles.input, styles.typeNr].join(' ')}
              placeholder="ID"
              tabIndex={5 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            />
          </div>
          <div className={styles.fieldDirektion}>
            <ControlLabel className={styles.label}>Direktion</ControlLabel>
            <FormControl
              type="text"
              value={geschaeft.zustaendigeDirektion || ''}
              name="zustaendigeDirektion"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={[styles.input, styles.fieldDirektion].join(' ')}
              tabIndex={6 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            />
          </div>
          <div className={styles.fieldDetails}>
            <ControlLabel className={styles.label}>Details</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={geschaeft.details || ''}
              name="details"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.input}
              rows={4}
              tabIndex={7 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            />
          </div>
          <div className={styles.fieldNaechsterSchritt}>
            <ControlLabel className={styles.label}>Nächster Schritt</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={geschaeft.naechsterSchritt || ''}
              name="naechsterSchritt"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.input}
              rows={3}
              tabIndex={8 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            />
          </div>
          <div className={styles.fieldVermerk}>
            <ControlLabel className={styles.label}>Vermerk</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={geschaeft.vermerk || ''}
              name="vermerk"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.input}
              rows={4}
              tabIndex={9 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            />
          </div>
          <div className={styles.fieldErledigung}>
            <ControlLabel className={styles.label}>Erledigung</ControlLabel>
            <FormControl
              componentClass="select"
              value={geschaeft.rechtsmittelerledigung || ''}
              name="rechtsmittelerledigung"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.input}
              tabIndex={10 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            >
              {this.options(rechtsmittelerledigungOptions)}
            </FormControl>
          </div>
        </div>
        <div className={styles.areaNummern}>
          <div className={styles.areaNummernTitle}>Nummern</div>
          <div className={styles.fieldIdGeschaeft}>
            <ControlLabel className={styles.label}>ID</ControlLabel>
            <FormControl
              type="number"
              value={geschaeft.idGeschaeft}
              bsSize="small"
              disabled
              className={[styles.input, styles.typeNr, styles.inputIdGeschaeft].join(' ')}
            />
          </div>
          <div className={styles.fieldGekoNr}>
            <ControlLabel className={styles.label}>Geko Nr.</ControlLabel>
            <FormControl
              type="number"
              value={geschaeft.GekoNr}
              name="gekoNr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex={1 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
              autoFocus={wrapperClass === styles.wrapperNarrow}
            />
          </div>
          <div className={styles.fieldEntscheidAwelNr}>
            <ControlLabel className={styles.label}>AWEL&nbsp;&nbsp;Nr.</ControlLabel>
            <FormControl
              type="number"
              value={geschaeft.entscheidAwelNr || ''}
              name="entscheidAwelNr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex={2 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.slashAwel}>
            <div>/</div>
          </div>
          <div className={styles.fieldEntscheidAwelJahr}>
            <ControlLabel className={styles.label}>Jahr</ControlLabel>
            <FormControl
              type="number"
              value={geschaeft.entscheidAwelJahr || ''}
              name="entscheidAwelJahr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex={3 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.fieldEntscheidBdvNr}>
            <ControlLabel className={styles.label}>BDV&nbsp;&nbsp;Nr.</ControlLabel>
            <FormControl
              type="number"
              value={geschaeft.entscheidBdvNr || ''}
              name="entscheidBdvNr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex={4 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.slashBdv}>
            <div>/</div>
          </div>
          <div className={styles.fieldEntscheidBdvJahr}>
            <ControlLabel className={styles.label}>Jahr</ControlLabel>
            <FormControl
              type="number"
              value={geschaeft.entscheidBdvJahr || ''}
              name="entscheidBdvJahr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex={5 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.fieldEntscheidKrNr}>
            <ControlLabel className={styles.label}>KR&nbsp;&nbsp;Nr.</ControlLabel>
            <FormControl
              type="number"
              value={geschaeft.entscheidKrNr || ''}
              name="entscheidKrNr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex={6 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.slashKr}>
            <div>/</div>
          </div>
          <div className={styles.fieldEntscheidKrJahr}>
            <ControlLabel className={styles.label}>Jahr</ControlLabel>
            <FormControl
              type="number"
              value={geschaeft.entscheidKrJahr || ''}
              name="entscheidKrJahr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex={7 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.fieldEntscheidRrbNr}>
            <ControlLabel className={styles.label}>RRB&nbsp;&nbsp;Nr.</ControlLabel>
            <FormControl
              type="number"
              value={geschaeft.entscheidRrbNr || ''}
              name="entscheidRrbNr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex={8 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.slashRrb}>
            <div>/</div>
          </div>
          <div className={styles.fieldEntscheidRrbJahr}>
            <ControlLabel className={styles.label}>Jahr</ControlLabel>
            <FormControl
              type="number"
              value={geschaeft.entscheidRrbJahr || ''}
              name="entscheidRrbJahr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex={9 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.fieldAktenstandort}>
            <ControlLabel className={styles.label}>Aktenstandort</ControlLabel>
            <FormControl
              type="text"
              value={geschaeft.aktenstandort || ''}
              name="aktenstandort"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.input}
              tabIndex={10 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.fieldAktennummer}>
            <ControlLabel className={styles.label}>Nr.</ControlLabel>
            <FormControl
              type="text"
              value={geschaeft.aktennummer || ''}
              name="aktennummer"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex={11 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
        </div>
        <div className={styles.areaParlVorst}>
          <div className={styles.areaParlVorstTitle}>Parlamentarische Vorstösse</div>
          <div className={styles.fieldParlVorstossTyp}>
            <ControlLabel className={styles.label}>Typ</ControlLabel>
            <FormControl
              componentClass="select"
              value={geschaeft.parlVorstossTyp || ''}
              name="parlVorstossTyp"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.input}
              tabIndex={1 + nrOfFieldsBeforePv}
            >
              {this.options(parlVorstossTypOptions)}
            </FormControl>
          </div>
          <div className={styles.fieldStufe}>
            <ControlLabel className={styles.label}>Stufe</ControlLabel>
            <Radio
              data-value={1}
              checked={geschaeft.parlVorstossStufe == 1}
              onChange={this.change}
              bsSize="small"
              name="parlVorstossStufe"
              tabIndex={2 + nrOfFieldsBeforePv}
            >
              1: nicht überwiesen
            </Radio>
            <Radio
              data-value={2}
              checked={geschaeft.parlVorstossStufe == 2}
              name="parlVorstossStufe"
              onChange={this.change}
              bsSize="small"
              tabIndex={3 + nrOfFieldsBeforePv}
            >
              2: überwiesen
            </Radio>
          </div>
          <div className={styles.fieldEbene}>
            <ControlLabel className={styles.label}>Ebene</ControlLabel>
            <Radio
              data-value="Kanton"
              checked={geschaeft.parlVorstossEbene === 'Kanton'}
              name="parlVorstossEbene"
              onChange={this.change}
              bsSize="small"
              tabIndex={4 + nrOfFieldsBeforePv}
            >
              Kanton
            </Radio>
            <Radio
              data-value="Bund"
              checked={geschaeft.parlVorstossEbene === 'Bund'}
              onChange={this.change}
              name="parlVorstossEbene"
              bsSize="small"
              tabIndex={5 + nrOfFieldsBeforePv}
            >
              Bund
            </Radio>
          </div>
          <div className={styles.fieldZustaendigkeit}>
            <ControlLabel className={styles.label}>Zuständigkeit</ControlLabel>
            <Radio
              data-value="hauptzuständig"
              checked={geschaeft.parlVorstossZustaendigkeitAwel === 'hauptzuständig'}
              name="parlVorstossZustaendigkeitAwel"
              onChange={this.change}
              bsSize="small"
              tabIndex={6 + nrOfFieldsBeforePv}
            >
              haupt
            </Radio>
            <Radio
              data-value="mitberichtzuständig"
              checked={geschaeft.parlVorstossZustaendigkeitAwel === 'mitberichtzuständig'}
              name="parlVorstossZustaendigkeitAwel"
              onChange={this.change}
              bsSize="small"
              tabIndex={7 + nrOfFieldsBeforePv}
            >
              mitbericht
            </Radio>
          </div>
          <div className={styles.fieldErlassform}>
            <ControlLabel className={styles.label}>Erlassform</ControlLabel>
            <Radio
              data-value="Gesetz"
              checked={geschaeft.erlassform === 'Gesetz'}
              name="erlassform"
              onChange={this.change}
              bsSize="small"
              tabIndex={8 + nrOfFieldsBeforePv}
            >
              Gesetz
            </Radio>
            <Radio
              data-value="Verordnung"
              checked={geschaeft.erlassform === 'Verordnung'}
              name="erlassform"
              onChange={this.change}
              bsSize="small"
              tabIndex={9 + nrOfFieldsBeforePv}
            >
              Verordnung
            </Radio>
          </div>
        </div>
        <div className={styles.areaFristen}>
          <div className={styles.areaFristenTitle}>Fristen</div>
          <FormGroup
            className={styles.fieldDatumEingangAwel}
            validationState={this.getDateValidationStateDate(geschaeft.datumEingangAwel)}
          >
            <ControlLabel className={styles.label}>Datum des Eingangs im AWEL</ControlLabel>
            <InputGroup>
              <FormControl
                type="text"
                value={geschaeft.datumEingangAwel}
                name="datumEingangAwel"
                ref="datumEingangAwel"
                onChange={this.change}
                onBlur={this.blur}
                bsSize="small"
                className={styles.input}
                tabIndex={1 + nrOfFieldsBeforeFristen}
              />
              <InputGroup.Addon>
                <DateRangePicker
                  singleDatePicker
                  drops="up"
                  onApply={this.onChangeDatePicker.bind(this, 'datumEingangAwel')}
                  className={styles.datePicker}
                >
                  <Glyphicon glyph="calendar" />
                </DateRangePicker>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          <FormGroup
            className={styles.fieldFristAwel}
            validationState={this.getDateValidationStateDate(geschaeft.fristAwel)}
          >
            <ControlLabel className={styles.label}>Frist für Erledigung durch AWEL</ControlLabel>
            <InputGroup>
              <FormControl
                type="text"
                value={geschaeft.fristAwel || ''}
                name="fristAwel"
                ref="fristAwel"
                onChange={this.change}
                onBlur={this.blur}
                bsSize="small"
                className={styles.input}
                tabIndex={2 + nrOfFieldsBeforeFristen}
              />
              <InputGroup.Addon>
                <DateRangePicker
                  singleDatePicker
                  drops="up"
                  onApply={this.onChangeDatePicker.bind(this, 'fristAwel')}
                  className={styles.datePicker}
                >
                  <Glyphicon glyph="calendar" />
                </DateRangePicker>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          <FormGroup
            className={styles.fieldFristAmtschef}
            validationState={this.getDateValidationStateDate(geschaeft.fristAmtschef)}
          >
            <ControlLabel className={styles.label}>Frist Vorlage an Amtschef</ControlLabel>
            <InputGroup>
              <FormControl
                type="text"
                value={geschaeft.fristAmtschef || ''}
                name="fristAmtschef"
                ref="fristAmtschef"
                onChange={this.change}
                onBlur={this.blur}
                bsSize="small"
                className={styles.input}
                tabIndex={3 + nrOfFieldsBeforeFristen}
              />
              <InputGroup.Addon>
                <DateRangePicker
                  singleDatePicker
                  drops="up"
                  onApply={this.onChangeDatePicker.bind(this, 'fristAmtschef')}
                  className={styles.datePicker}
                >
                  <Glyphicon glyph="calendar" />
                </DateRangePicker>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          <FormGroup
            className={styles.fieldFristAbteilung}
            validationState={this.getDateValidationStateDate(geschaeft.fristAbteilung)}
          >
            <ControlLabel className={styles.label}>Frist für Erledigung durch Abteilung</ControlLabel>
            <InputGroup>
              <FormControl
                type="text"
                value={geschaeft.fristAbteilung || ''}
                name="fristAbteilung"
                ref="fristAbteilung"
                onChange={this.change}
                onBlur={this.blur}
                bsSize="small"
                className={styles.input}
                tabIndex={4 + nrOfFieldsBeforeFristen}
              />
              <InputGroup.Addon>
                <DateRangePicker
                  singleDatePicker
                  drops="up"
                  onApply={this.onChangeDatePicker.bind(this, 'fristAbteilung')}
                  className={styles.datePicker}
                >
                  <Glyphicon glyph="calendar" />
                </DateRangePicker>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          <FormGroup
            className={styles.fieldFristMitarbeiter}
            validationState={this.getDateValidationStateDate(geschaeft.fristMitarbeiter)}
          >
            <ControlLabel className={styles.label}>Frist Erledigung nächster Schritt RD</ControlLabel>
            <InputGroup>
              <FormControl
                type="text"
                value={geschaeft.fristMitarbeiter || ''}
                name="fristMitarbeiter"
                ref="fristMitarbeiter"
                onChange={this.change}
                onBlur={this.blur}
                bsSize="small"
                className={styles.input}
                tabIndex={5 + nrOfFieldsBeforeFristen}
              />
              <InputGroup.Addon>
                <DateRangePicker
                  singleDatePicker
                  drops="up"
                  onApply={this.onChangeDatePicker.bind(this, 'fristMitarbeiter')}
                  className={styles.datePicker}
                >
                  <Glyphicon glyph="calendar" />
                </DateRangePicker>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          <div className={styles.fieldFristDauerBisMitarbeiter}>
            <ControlLabel className={styles.label}>Tage bis Frist Mitarbeiter</ControlLabel>
            <FormControl.Static className={styles.formControlStatic}>
              {this.fristDauerBisMitarbeiter()}
            </FormControl.Static>
          </div>
          <FormGroup
            className={styles.fieldDatumAusgangAwel}
            validationState={this.getDateValidationStateDate(geschaeft.datumAusgangAwel)}
          >
            <ControlLabel className={styles.label}>Datum Ausgang AWEL (erledigt)</ControlLabel>
            <InputGroup>
              <FormControl
                type="text"
                value={geschaeft.datumAusgangAwel || ''}
                name="datumAusgangAwel"
                ref="datumAusgangAwel"
                onChange={this.change}
                onBlur={this.blur}
                bsSize="small"
                className={styles.input}
                tabIndex={6 + nrOfFieldsBeforeFristen}
              />
              <InputGroup.Addon>
                <DateRangePicker
                  singleDatePicker
                  drops="up"
                  onApply={this.onChangeDatePicker.bind(this, 'datumAusgangAwel')}
                  className={styles.datePicker}
                >
                  <Glyphicon glyph="calendar" />
                </DateRangePicker>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          <FormGroup
            className={styles.fieldFristDirektion}
            validationState={this.getDateValidationStateDate(geschaeft.fristDirektion)}
          >
            <ControlLabel className={styles.label}>Frist für Erledigung durch Direktion</ControlLabel>
            <InputGroup>
              <FormControl
                type="text"
                value={geschaeft.fristDirektion || ''}
                name="fristDirektion"
                ref="fristDirektion"
                onChange={this.change}
                onBlur={this.blur}
                bsSize="small"
                className={styles.input}
                tabIndex={7 + nrOfFieldsBeforeFristen}
              />
              <InputGroup.Addon>
                <DateRangePicker
                  singleDatePicker
                  drops="up"
                  onApply={this.onChangeDatePicker.bind(this, 'fristDirektion')}
                  className={styles.datePicker}
                >
                  <Glyphicon glyph="calendar" />
                </DateRangePicker>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          <div className={styles.fieldMutationsdatum}>
            <ControlLabel className={styles.label}>Letze Mutation</ControlLabel>
            <FormControl.Static className={styles.formControlStatic}>
              {geschaeft.mutationsdatum || ''}
            </FormControl.Static>
          </div>
        </div>
        <div className={styles.areaPersonen}>
          <div className={styles.areaPersonenTitle}>Personen</div>
          <div className={styles.areaVerantwortlichSubTitle}>Verantwortlich</div>
          <div className={styles.fieldVerantwortlich}>
            <FormControl
              componentClass="select"
              value={geschaeft.verantwortlich || ''}
              name="verantwortlich"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.input}
              tabIndex={1 + nrOfFieldsBeforePersonen}
            >
              {this.options(interneOptions.map((o) => o.kurzzeichen).sort())}
            </FormControl>
          </div>
          <div className={styles.fieldVerantwortlichName}>
            <FormControl.Static>
              {this.verantwortlichData()}
            </FormControl.Static>
          </div>
          <div className={styles.areaInterneKontakteSubTitle}>Interne Kontakte</div>
          <GeschaeftKontakteIntern tabIndex={nrOfFieldsBeforePersonen + 1} />
          <div className={styles.areaExterneKontakteSubTitle}>Externe Kontakte</div>
          <GeschaeftKontakteExtern tabIndex={nrOfFieldsBeforePersonen + 2} />
        </div>
      </div>
    )
  }
}

export default Geschaeft
