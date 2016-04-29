'use strict'

import React, { Component, PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styles from './AreaNummern.css'

class AreaNummern extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    change: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired,
    wrapperClass: PropTypes.string,
    nrOfGFields: PropTypes.number
  }

  render = () => {
    const {
      geschaeft,
      wrapperClass,
      nrOfGFields,
      change,
      blur
    } = this.props

    return (
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
            onChange={change}
            onBlur={blur}
            bsSize="small"
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
            onChange={change}
            onBlur={blur}
            bsSize="small"
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
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={3 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
          />
        </div>
        <ControlLabel className={styles.labelEntscheidBdv}>BDV</ControlLabel>
        <div className={styles.fieldEntscheidBdvNr}>
          <FormControl
            type="number"
            value={geschaeft.entscheidBdvNr || ''}
            name="entscheidBdvNr"
            onChange={change}
            onBlur={blur}
            bsSize="small"
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
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={5 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
          />
        </div>
        <ControlLabel className={styles.labelEntscheidKr}>KR</ControlLabel>
        <div className={styles.fieldEntscheidKrNr}>
          <FormControl
            type="number"
            value={geschaeft.entscheidKrNr || ''}
            name="entscheidKrNr"
            onChange={change}
            onBlur={blur}
            bsSize="small"
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
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={7 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
          />
        </div>
        <ControlLabel className={styles.labelEntscheidRrb}>RRB</ControlLabel>
        <div className={styles.fieldEntscheidRrbNr}>
          <FormControl
            type="number"
            value={geschaeft.entscheidRrbNr || ''}
            name="entscheidRrbNr"
            onChange={change}
            onBlur={blur}
            bsSize="small"
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
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={9 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
          />
        </div>
        <div className={styles.fieldAktenstandort}>
          <ControlLabel>Aktenstandort</ControlLabel>
          <FormControl
            type="text"
            value={geschaeft.aktenstandort || ''}
            name="aktenstandort"
            onChange={change}
            onBlur={blur}
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
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={11 + (wrapperClass === styles.wrapperNarrow ? 0 : nrOfGFields)}
          />
        </div>
      </div>
    )
  }
}

export default AreaNummern
