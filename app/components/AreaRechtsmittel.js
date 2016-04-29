'use strict'

import React, { Component, PropTypes } from 'react'
import { FormControl, ControlLabel, Radio } from 'react-bootstrap'
import styles from './AreaRechtsmittel.css'
import createOptions from '../src/createOptions'

class AreaRechtsmittel extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    parlVorstossTypOptions: PropTypes.array.isRequired,
    nrOfFieldsBeforePv: PropTypes.number,
    change: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired
  }

  render = () => {
    const { geschaeft, parlVorstossTypOptions, nrOfFieldsBeforePv, change, blur } = this.props
    return (
      <div className={styles.areaForGeschaeftsart}>
        <div className={styles.areaParlVorstTitle}>Rechtsmittel</div>
        <div className={styles.fieldParlVorstossTyp}>
          <ControlLabel>Typ</ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.parlVorstossTyp || ''}
            name="parlVorstossTyp"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={1 + nrOfFieldsBeforePv}
          >
            {createOptions(parlVorstossTypOptions)}
          </FormControl>
        </div>
        <div className={styles.fieldStufe}>
          <ControlLabel>Stufe</ControlLabel>
          <Radio
            data-value={1}
            checked={geschaeft.parlVorstossStufe == 1}
            onChange={change}
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
            onChange={change}
            bsSize="small"
            tabIndex={3 + nrOfFieldsBeforePv}
          >
            2: überwiesen
          </Radio>
        </div>
        <div className={styles.fieldEbene}>
          <ControlLabel>Ebene</ControlLabel>
          <Radio
            data-value="Kanton"
            checked={geschaeft.parlVorstossEbene === 'Kanton'}
            name="parlVorstossEbene"
            onChange={change}
            bsSize="small"
            tabIndex={4 + nrOfFieldsBeforePv}
          >
            Kanton
          </Radio>
          <Radio
            data-value="Bund"
            checked={geschaeft.parlVorstossEbene === 'Bund'}
            onChange={change}
            name="parlVorstossEbene"
            bsSize="small"
            tabIndex={5 + nrOfFieldsBeforePv}
          >
            Bund
          </Radio>
        </div>
        <div className={styles.fieldZustaendigkeit}>
          <ControlLabel>Zuständigkeit</ControlLabel>
          <Radio
            data-value="hauptzuständig"
            checked={geschaeft.parlVorstossZustaendigkeitAwel === 'hauptzuständig'}
            name="parlVorstossZustaendigkeitAwel"
            onChange={change}
            bsSize="small"
            tabIndex={6 + nrOfFieldsBeforePv}
          >
            haupt
          </Radio>
          <Radio
            data-value="mitberichtzuständig"
            checked={geschaeft.parlVorstossZustaendigkeitAwel === 'mitberichtzuständig'}
            name="parlVorstossZustaendigkeitAwel"
            onChange={change}
            bsSize="small"
            tabIndex={7 + nrOfFieldsBeforePv}
          >
            mitbericht
          </Radio>
        </div>
        <div className={styles.fieldErlassform}>
          <ControlLabel>Erlassform</ControlLabel>
          <Radio
            data-value="Gesetz"
            checked={geschaeft.erlassform === 'Gesetz'}
            name="erlassform"
            onChange={change}
            bsSize="small"
            tabIndex={8 + nrOfFieldsBeforePv}
          >
            Gesetz
          </Radio>
          <Radio
            data-value="Verordnung"
            checked={geschaeft.erlassform === 'Verordnung'}
            name="erlassform"
            onChange={change}
            bsSize="small"
            tabIndex={9 + nrOfFieldsBeforePv}
          >
            Verordnung
          </Radio>
        </div>
      </div>
    )
  }
}

export default AreaRechtsmittel
