'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { FormControl, ControlLabel } from 'react-bootstrap'
import moment from 'moment'
moment.locale('de')
import styles from './Geschaeft.css'
import isDateField from '../src/isDateField'
import validateDate from '../src/validateDate'
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
    rechtsmittelerledigungOptions: PropTypes.array.isRequired,
    statusOptions: PropTypes.array.isRequired,
    geschaeftsartOptions: PropTypes.array.isRequired,
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

  options = (values) => {
    const options = values.map((val, index) => <option key={index + 1} value={val}>{val}</option>)
    options.unshift(<option key={0} value=""></option>)
    return options
  }

  render = () => {
    const {
      geschaeft,
      rechtsmittelerledigungOptions,
      statusOptions,
      geschaeftsartOptions,
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
              rows={2}
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
              tabIndex={2 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            />
          </div>
          <div className={styles.fieldGeschaeftsart}>
            <ControlLabel>Geschäftsart</ControlLabel>
            <FormControl
              componentClass="select"
              value={geschaeft.geschaeftsart || ''}
              name="geschaeftsart"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              tabIndex={3 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            >
              {this.options(geschaeftsartOptions)}
            </FormControl>
          </div>
          <div className={styles.fieldStatus}>
            <ControlLabel>Status</ControlLabel>
            <FormControl
              componentClass="select"
              value={geschaeft.status || ''}
              name="status"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              tabIndex={4 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            >
              {this.options(statusOptions)}
            </FormControl>
          </div>
          <div className={styles.fieldDirektion}>
            <ControlLabel>Direktion</ControlLabel>
            <FormControl
              type="text"
              value={geschaeft.zustaendigeDirektion || ''}
              name="zustaendigeDirektion"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.fieldDirektion}
              tabIndex={6 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            />
          </div>
          <div className={styles.fieldDetails}>
            <ControlLabel>Details</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={geschaeft.details || ''}
              name="details"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              rows={4}
              tabIndex={7 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            />
          </div>
          <div className={styles.fieldNaechsterSchritt}>
            <ControlLabel>Nächster Schritt</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={geschaeft.naechsterSchritt || ''}
              name="naechsterSchritt"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              rows={4}
              tabIndex={8 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            />
          </div>
          <div className={styles.fieldVermerk}>
            <ControlLabel>Vermerk</ControlLabel>
            <FormControl
              componentClass="textarea"
              value={geschaeft.vermerk || ''}
              name="vermerk"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              rows={4}
              tabIndex={9 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            />
          </div>
          <div className={styles.fieldErledigung}>
            <ControlLabel>Erledigung</ControlLabel>
            <FormControl
              componentClass="select"
              value={geschaeft.rechtsmittelerledigung || ''}
              name="rechtsmittelerledigung"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              tabIndex={10 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
            >
              {this.options(rechtsmittelerledigungOptions)}
            </FormControl>
          </div>
        </div>
        <div className={styles.areaNummern}>
          <div className={styles.areaNummernTitle}>Nummern</div>
          <ControlLabel className={styles.labelNr}>
            <div className={styles.labelNrDiv}>Nr.</div>
          </ControlLabel>
          <ControlLabel className={styles.labelIdGeschaeft}>ID</ControlLabel>
          <div className={styles.fieldIdGeschaeft}>
            <FormControl
              type="number"
              value={geschaeft.idGeschaeft}
              bsSize="small"
              disabled
              className={[styles.typeNr, styles.inputIdGeschaeft].join(' ')}
            />
          </div>
          <ControlLabel className={styles.labelGekoNr}>Geko</ControlLabel>
          <div className={styles.fieldGekoNr}>
            <FormControl
              type="number"
              value={geschaeft.GekoNr}
              name="gekoNr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.typeNr}
              tabIndex={1 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
              autoFocus={wrapperClass === styles.wrapperNarrow}
            />
          </div>
          <div className={styles.labelJahre}>
            Jahr
          </div>
          <ControlLabel className={styles.labelEntscheidAwel}>AWEL</ControlLabel>
          <div className={styles.fieldEntscheidAwelNr}>
            <FormControl
              type="number"
              value={geschaeft.entscheidAwelNr || ''}
              name="entscheidAwelNr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.typeNr}
              tabIndex={2 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.slashAwel}>
            <div>/</div>
          </div>
          <div className={styles.fieldEntscheidAwelJahr}>
            <FormControl
              type="number"
              value={geschaeft.entscheidAwelJahr || ''}
              name="entscheidAwelJahr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.typeNr}
              tabIndex={3 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <ControlLabel className={styles.labelEntscheidBdv}>BDV</ControlLabel>
          <div className={styles.fieldEntscheidBdvNr}>
            <FormControl
              type="number"
              value={geschaeft.entscheidBdvNr || ''}
              name="entscheidBdvNr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.typeNr}
              tabIndex={4 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.slashBdv}>
            <div>/</div>
          </div>
          <div className={styles.fieldEntscheidBdvJahr}>
            <FormControl
              type="number"
              value={geschaeft.entscheidBdvJahr || ''}
              name="entscheidBdvJahr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.typeNr}
              tabIndex={5 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <ControlLabel className={styles.labelEntscheidKr}>KR</ControlLabel>
          <div className={styles.fieldEntscheidKrNr}>
            <FormControl
              type="number"
              value={geschaeft.entscheidKrNr || ''}
              name="entscheidKrNr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.typeNr}
              tabIndex={6 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.slashKr}>
            <div>/</div>
          </div>
          <div className={styles.fieldEntscheidKrJahr}>
            <FormControl
              type="number"
              value={geschaeft.entscheidKrJahr || ''}
              name="entscheidKrJahr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.typeNr}
              tabIndex={7 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <ControlLabel className={styles.labelEntscheidRrb}>RRB</ControlLabel>
          <div className={styles.fieldEntscheidRrbNr}>
            <FormControl
              type="number"
              value={geschaeft.entscheidRrbNr || ''}
              name="entscheidRrbNr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.typeNr}
              tabIndex={8 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.slashRrb}>
            <div>/</div>
          </div>
          <div className={styles.fieldEntscheidRrbJahr}>
            <FormControl
              type="number"
              value={geschaeft.entscheidRrbJahr || ''}
              name="entscheidRrbJahr"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.typeNr}
              tabIndex={9 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.fieldAktenstandort}>
            <ControlLabel>Aktenstandort</ControlLabel>
            <FormControl
              type="text"
              value={geschaeft.aktenstandort || ''}
              name="aktenstandort"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              tabIndex={10 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
          <div className={styles.fieldAktennummer}>
            <ControlLabel>Nr.</ControlLabel>
            <FormControl
              type="text"
              value={geschaeft.aktennummer || ''}
              name="aktennummer"
              onChange={this.change}
              onBlur={this.blur}
              bsSize="small"
              className={styles.typeNr}
              tabIndex={11 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
            />
          </div>
        </div>
        <AreaParlVorstoss nrOfFieldsBeforePv={nrOfFieldsBeforePv} change={this.change} blur={this.blur} />
        <AreaFristen
          nrOfFieldsBeforeFristen={nrOfFieldsBeforeFristen}
          change={this.change}
          blur={this.blur}
          onChangeDatePicker={this.onChangeDatePicker}
        />
        <AreaPersonen nrOfFieldsBeforePersonen={nrOfFieldsBeforePersonen} change={this.change} blur={this.blur} />
        <AreaHistory blur={this.blur} change={this.change} />
        <AreaZuletztMutiert />
        {/* need this so lowest fields are visible */}
        <div style={{ height: 52 }} />
      </div>
    )
  }
}

export default Geschaeft
