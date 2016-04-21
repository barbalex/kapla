'use strict'

import React, { Component, PropTypes } from 'react'
import { FormGroup, FormControl, ControlLabel, Radio } from 'react-bootstrap'
import moment from 'moment'
import styles from './Geschaeft.css'
import isDateField from '../src/isDateField'

class Geschaeft extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    activeId: PropTypes.number,
    geschaefteChangeState: PropTypes.func.isRequired,
    changeGeschaeftInDb: PropTypes.func.isRequired,
    rechtsmittelerledigungOptions: PropTypes.array.isRequired,
    parlVorstossTypOptions: PropTypes.array.isRequired,
    statusOptions: PropTypes.array.isRequired,
    geschaeftsartOptions: PropTypes.array.isRequired,
    geschaefteLayout: PropTypes.object.isRequired
  }

  getDateValidationState = (date) => {
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
    if (type === 'radio') value = dataset.value
    if (isDateField(name)) {
      if (this.validateDate(value)) {
        // if correct date, save to db
        changeGeschaeftInDb(activeId, name, value)
      }
      // else: give user hint
      let value2 = ''
      if (value) value2 = moment(value, 'DD.MM.YYYY').format('DD.MM.YYYY')
      value2 = value2.replace('Invalid date', 'Format: DD.MM.YYYY')
      geschaefteChangeState(activeId, name, value2)
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
    const end = moment(geschaeft.fristMitarbeiter)
    const duration = moment.duration(end.diff(now))
    const days = duration.asDays()
    return Math.ceil(days)
  }

  render() {
    const {
      geschaeft,
      rechtsmittelerledigungOptions,
      parlVorstossTypOptions,
      statusOptions,
      geschaeftsartOptions,
      geschaefteLayout
    } = this.props

    // need width to set layout for differing widths
    const geschaefteLayoutWidth = geschaefteLayout.width
    const geschaeftWidthPercent = geschaefteLayout.config.content[0].content[1].width
    const totalWidth = geschaefteLayoutWidth * geschaeftWidthPercent / 100
    const wrapperClass = totalWidth < 750 ? styles.wrapperNarrow : styles.wrapperWide
    const showGeschaeft = geschaeft && geschaeft.idGeschaeft

    if (!showGeschaeft) return null
    return (
      <div className={wrapperClass}>
        <div className={styles.areaGeschaeft}>
          <div className={styles.fieldGegenstand}>
            <div className={styles.areaGeschaeftTitle}>Geschäft</div>
            <ControlLabel>Gegenstand</ControlLabel>
            <FormControl
              componentClass="textarea"
              value = {geschaeft.gegenstand || ''}
              name = "gegenstand"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className = {[styles.input, styles.gegenstand].join(' ')}
              tabIndex = {1}
              autoFocus
            />
          </div>
          <div className={styles.fieldOrt}>
            <ControlLabel>Ort</ControlLabel>
            <FormControl
              type = "text"
              value = {geschaeft.ort || ''}
              name = "ort"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={styles.input}
              tabIndex = {2}
            />
          </div>
          <div className={styles.fieldGeschaeftsart}>
            <ControlLabel className={styles.label}>Geschäftsart</ControlLabel>
            <FormControl
              componentClass="select"
              value = {geschaeft.geschaeftsart || ''}
              name = "geschaeftsart"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={styles.input}
              tabIndex = {3}
            >
              {this.options(geschaeftsartOptions)}
            </FormControl>
          </div>
          <div className={styles.fieldStatus}>
            <ControlLabel className={styles.label}>Status</ControlLabel>
            <FormControl
              componentClass="select"
              value = {geschaeft.status || ''}
              name = "status"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={styles.input}
              tabIndex = {4}
            >
              {this.options(statusOptions)}
            </FormControl>
          </div>
          <div className={styles.fieldVorgeschaeft}>
            <ControlLabel className={styles.label}>Vorgeschäft</ControlLabel>
            <FormControl
              type = "number"
              value = {geschaeft.idVorgeschaeft || ''}
              name = "idVorgeschaeft"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className = {[styles.input, styles.typeNr].join(' ')}
              placeholder = "ID"
              tabIndex = {5}
            />
          </div>
          <div className={styles.fieldDirektion}>
            <ControlLabel className={styles.label}>Direktion</ControlLabel>
            <FormControl
              type = "text"
              value = {geschaeft.zustaendigeDirektion || ''}
              name = "zustaendigeDirektion"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={[styles.input, styles.fieldDirektion].join(' ')}
              tabIndex = {6}
            />
          </div>
          <div className={styles.fieldDetails}>
            <ControlLabel className={styles.label}>Details</ControlLabel>
            <FormControl
              componentClass="textarea"
              value = {geschaeft.details || ''}
              name = "details"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={styles.input}
              rows = {4}
              tabIndex = {7}
            />
          </div>
          <div className={styles.fieldNaechsterSchritt}>
            <ControlLabel className={styles.label}>Nächster Schritt</ControlLabel>
            <FormControl
              componentClass="textarea"
              value = {geschaeft.naechsterSchritt || ''}
              name = "naechsterSchritt"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className = {styles.input}
              rows = {3}
              tabIndex = {8}
            />
          </div>
          <div className={styles.fieldVermerk}>
            <ControlLabel className={styles.label}>Vermerk</ControlLabel>
            <FormControl
              componentClass="textarea"
              value = {geschaeft.vermerk || ''}
              name = "vermerk"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={styles.input}
              rows = {4}
              tabIndex = {9}
            />
          </div>
          <div className={styles.fieldErledigung}>
            <ControlLabel className={styles.label}>Erledigung</ControlLabel>
            <FormControl
              componentClass="select"
              value = {geschaeft.rechtsmittelerledigung || ''}
              name = "rechtsmittelerledigung"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={styles.input}
              tabIndex = {10}
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
              type = "number"
              value = {geschaeft.idGeschaeft}
              bsSize = "small"
              disabled
              className={[styles.input, styles.typeNr].join(' ')}
            />
          </div>
          <div className={styles.fieldEntscheidAwelNr}>
            <ControlLabel className={styles.label}>AWEL Nr.</ControlLabel>
            <FormControl
              type = "number"
              value = {geschaeft.entscheidAwelNr || ''}
              name = "entscheidAwelNr"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex = {11}
            />
          </div>
          <div className={styles.fieldEntscheidAwelJahr}>
            <ControlLabel className={styles.label}>Jahr</ControlLabel>
            <FormControl
              type = "number"
              value = {geschaeft.entscheidAwelJahr || ''}
              name = "entscheidAwelJahr"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex = {12}
            />
          </div>
          <div className={styles.fieldEntscheidBdvNr}>
            <ControlLabel className={styles.label}>BDV&nbsp;&nbsp;&nbsp;&nbsp;Nr.</ControlLabel>
            <FormControl
              type = "number"
              value = {geschaeft.entscheidBdvNr || ''}
              name = "entscheidBdvNr"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex = {13}
            />
          </div>
          <div className={styles.fieldEntscheidBdvJahr}>
            <ControlLabel className={styles.label}>Jahr</ControlLabel>
            <FormControl
              type = "number"
              value = {geschaeft.entscheidBdvJahr || ''}
              name = "entscheidBdvJahr"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex = {14}
            />
          </div>
          <div className={styles.fieldEntscheidKrNr}>
            <ControlLabel className={styles.label}>KR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nr.</ControlLabel>
            <FormControl
              type = "number"
              value = {geschaeft.entscheidKrNr || ''}
              name = "entscheidKrNr"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex = {15}
            />
          </div>
          <div className={styles.feildEntscheidKrJahr}>
            <ControlLabel className={styles.label}>Jahr</ControlLabel>
            <FormControl
              type = "number"
              value = {geschaeft.entscheidKrJahr || ''}
              name = "entscheidKrJahr"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex = {16}
            />
          </div>
          <div className={styles.fieldEntscheidRrbNr}>
            <ControlLabel className={styles.label}>RRB&nbsp;&nbsp;&nbsp;&nbsp;Nr.</ControlLabel>
            <FormControl
              type = "number"
              value = {geschaeft.entscheidRrbNr || ''}
              name = "entscheidRrbNr"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex = {17}
            />
          </div>
          <div className={styles.fieldEntscheidRrbJahr}>
            <ControlLabel className={styles.label}>Jahr</ControlLabel>
            <FormControl
              type = "number"
              value = {geschaeft.entscheidRrbJahr || ''}
              name = "entscheidRrbJahr"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex = {18}
            />
          </div>
          <div className={styles.fieldAktenstandort}>
            <ControlLabel className={styles.label}>Aktenstandort</ControlLabel>
            <FormControl
              type = "text"
              value = {geschaeft.aktenstandort || ''}
              name = "aktenstandort"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={styles.input}
              tabIndex = {19}
            />
          </div>
          <div className={styles.fieldAktennummer}>
            <ControlLabel className={styles.label}>Nr.</ControlLabel>
            <FormControl
              type = "text"
              value = {geschaeft.aktennummer || ''}
              name = "aktennummer"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={[styles.input, styles.typeNr].join(' ')}
              tabIndex = {20}
            />
          </div>
        </div>
        <div className={styles.areaParlVorst}>
          <div className={styles.areaParlVorstTitle}>Parlamentarische Vorstösse</div>
          <div className={styles.fieldParlVorstossTyp}>
            <ControlLabel className={styles.label}>Typ</ControlLabel>
            <FormControl
              componentClass="select"
              value = {geschaeft.parlVorstossTyp || ''}
              name = "parlVorstossTyp"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={styles.input}
              tabIndex = {21}
            >
              {this.options(parlVorstossTypOptions)}
            </FormControl>
          </div>
          <div className={styles.fieldStufe}>
            <ControlLabel className={styles.label}>Stufe</ControlLabel>
            <Radio
              data-value = {1}
              checked = {geschaeft.parlVorstossStufe == 1}
              onChange = {this.change}
              bsSize = "small"
              name = "parlVorstossStufe"
              tabIndex = {22}
            >
              1
            </Radio>
            <Radio
              data-value = {2}
              checked = {geschaeft.parlVorstossStufe == 2}
              name = "parlVorstossStufe"
              onChange = {this.change}
              bsSize = "small"
              tabIndex = {23}
            >
              2
            </Radio>
          </div>
          <div className={styles.fieldEbene}>
            <ControlLabel className={styles.label}>Ebene</ControlLabel>
            <Radio
              data-value = "Kanton"
              checked = {geschaeft.parlVorstossEbene === 'Kanton'}
              name = "parlVorstossEbene"
              onChange = {this.change}
              bsSize = "small"
              tabIndex = {24}
            >
              Kanton
            </Radio>
            <Radio
              data-value = "Bund"
              checked = {geschaeft.parlVorstossEbene === 'Bund'}
              onChange = {this.change}
              name = "parlVorstossEbene"
              bsSize = "small"
              tabIndex = {25}
            >
              Bund
            </Radio>
          </div>
          <div className={styles.fieldZustaendigkeit}>
            <ControlLabel className={styles.label}>Zuständigkeit</ControlLabel>
            <Radio
              data-value = "hauptzuständig"
              checked = {geschaeft.parlVorstossZustaendigkeitAwel === 'hauptzuständig'}
              name = "parlVorstossZustaendigkeitAwel"
              onChange = {this.change}
              bsSize = "small"
              tabIndex = {26}
            >
              haupt
            </Radio>
            <Radio
              data-value = "mitberichtzuständig"
              checked = {geschaeft.parlVorstossZustaendigkeitAwel === 'mitberichtzuständig'}
              name = "parlVorstossZustaendigkeitAwel"
              onChange = {this.change}
              bsSize = "small"
              tabIndex = {27}
            >
              mitbericht
            </Radio>
          </div>
          <div className={styles.fieldErlassform}>
            <ControlLabel className={styles.label}>Erlassform</ControlLabel>
            <Radio
              data-value = "Gesetz"
              checked = {geschaeft.erlassform === 'Gesetz'}
              name = "erlassform"
              onChange = {this.change}
              bsSize = "small"
              tabIndex = {28}
            >
              Gesetz
            </Radio>
            <Radio
              data-value = "Verordnung"
              checked = {geschaeft.erlassform === 'Verordnung'}
              name = "erlassform"
              onChange = {this.change}
              bsSize = "small"
              tabIndex = {29}
            >
              Verordnung
            </Radio>
          </div>
        </div>
        <div className={styles.areaFristen}>
          <FormGroup
            className={styles.fieldDatumEingangAwel}
            validationState={this.getDateValidationState(geschaeft.datumEingangAwel)}
          >
            <ControlLabel className={styles.label}>Datum des Eingangs im AWEL</ControlLabel>
            <FormControl
              type = "text"
              value = {geschaeft.datumEingangAwel}
              name = "datumEingangAwel"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={styles.input}
              tabIndex = {30}
            />
          </FormGroup>
          <div className={styles.fieldFristAwel}>
            <ControlLabel className={styles.label}>Frist für Erledigung durch AWEL</ControlLabel>
            <FormControl
              type = "date"
              value = {geschaeft.fristAwel || ''}
              name = "fristAwel"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={styles.input}
              tabIndex = {31}
            />
          </div>
          <div className={styles.fieldFristAmtschef}>
            <ControlLabel className={styles.label}>Frist Vorlage an Amtschef</ControlLabel>
            <FormControl
              type = "date"
              value = {geschaeft.fristAmtschef || ''}
              name = "fristAmtschef"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={styles.input}
              tabIndex = {32}
            />
          </div>
          <div className={styles.fieldFristAbteilung}>
            <ControlLabel className={styles.label}>Frist für Erledigung durch Abteilung</ControlLabel>
            <FormControl
              type = "date"
              value = {geschaeft.fristAbteilung || ''}
              name = "fristAbteilung"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={styles.input}
              tabIndex = {33}
            />
          </div>
          <div className={styles.fieldFristMitarbeiter}>
            <ControlLabel className={styles.label}>Frist Erledigung nächster Schritt RD</ControlLabel>
            <FormControl
              type = "date"
              value = {geschaeft.fristMitarbeiter || ''}
              name = "fristMitarbeiter"
              onChange = {this.change}
              onBlur = {this.blur}
              bsSize = "small"
              className={styles.input}
              tabIndex = {34}
            />
          </div>
          <div className={styles.fieldFristDauerBisMitarbeiter}>
            <ControlLabel className={styles.label}>Dauer bis Frist Mitarbeiter</ControlLabel>
            <FormControl.Static>
              {this.fristDauerBisMitarbeiter()}
            </FormControl.Static>
          </div>
        </div>
        <div className={styles.areaPersonen}>
        </div>
      </div>
    )
  }
}

export default Geschaeft
