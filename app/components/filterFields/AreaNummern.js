'use strict'

import React, { PropTypes } from 'react'
import { FormControl, ControlLabel, InputGroup } from 'react-bootstrap'
import ComparatorSelector from '../../containers/filterFields/ComparatorSelector'
import styles from './areaNummern.css'

const AreaNummern = ({
  values,
  wrapperClass,
  nrOfGFields,
  change,
  changeComparator,
}) => {
  const tabsToAdd = (
    wrapperClass === styles.wrapperNarrow ?
    0 :
    nrOfGFields
  )

  return (
    <div className={styles.areaNummern}>
      <div className={styles.areaNummernTitle}>
        Nummern
      </div>
      <ControlLabel className={styles.labelNr}>
        <div className={styles.labelNrDiv}>
          Nr.
        </div>
      </ControlLabel>
      <ControlLabel className={styles.labelIdGeschaeft}>
        ID
      </ControlLabel>
      <div className={styles.fieldIdGeschaeft}>
        <InputGroup>
          <ComparatorSelector
            name="idGeschaeft"
            changeComparator={changeComparator}
          />
          <FormControl
            type="number"
            value={values.idGeschaeft || ''}
            name="idGeschaeft"
            onChange={change}
            bsSize="small"
            tabIndex={1 + tabsToAdd}
            className={[styles.typeNr, styles.inputIdGeschaeft].join(' ')}
          />
        </InputGroup>
      </div>
      <ControlLabel className={styles.labelGekoNr}>
        Geko
      </ControlLabel>
      <div className={styles.fieldGekoNr}>
        <FormControl
          type="number"
          value={values.GekoNr || ''}
          name="gekoNr"
          onChange={change}
          bsSize="small"
          tabIndex={2 + tabsToAdd}
          autoFocus={wrapperClass === styles.wrapperNarrow}
        />
      </div>
      <div className={styles.labelJahre}>
        <div className={styles.labelNrDiv}>
          Jahr
        </div>
      </div>
      <ControlLabel className={styles.labelEntscheidAwel}>
        AWEL
      </ControlLabel>
      <div className={styles.fieldEntscheidAwelNr}>
        <FormControl
          type="number"
          value={values.entscheidAwelNr || ''}
          name="entscheidAwelNr"
          onChange={change}
          bsSize="small"
          tabIndex={3 + tabsToAdd}
        />
      </div>
      <div className={styles.slashAwel}>
        <div>/</div>
      </div>
      <div className={styles.fieldEntscheidAwelJahr}>
        <FormControl
          type="number"
          value={values.entscheidAwelJahr || ''}
          name="entscheidAwelJahr"
          onChange={change}
          bsSize="small"
          tabIndex={4 + tabsToAdd}
        />
      </div>
      <ControlLabel className={styles.labelEntscheidBdv}>
        BDV
      </ControlLabel>
      <div className={styles.fieldEntscheidBdvNr}>
        <FormControl
          type="number"
          value={values.entscheidBdvNr || ''}
          name="entscheidBdvNr"
          onChange={change}
          bsSize="small"
          tabIndex={5 + tabsToAdd}
        />
      </div>
      <div className={styles.slashBdv}>
        <div>/</div>
      </div>
      <div className={styles.fieldEntscheidBdvJahr}>
        <FormControl
          type="number"
          value={values.entscheidBdvJahr || ''}
          name="entscheidBdvJahr"
          onChange={change}
          bsSize="small"
          tabIndex={6 + tabsToAdd}
        />
      </div>
      <ControlLabel className={styles.labelEntscheidKr}>
        KR
      </ControlLabel>
      <div className={styles.fieldEntscheidKrNr}>
        <FormControl
          type="number"
          value={values.entscheidKrNr || ''}
          name="entscheidKrNr"
          onChange={change}
          bsSize="small"
          tabIndex={7 + tabsToAdd}
        />
      </div>
      <div className={styles.slashKr}>
        <div>/</div>
      </div>
      <div className={styles.fieldEntscheidKrJahr}>
        <FormControl
          type="number"
          value={values.entscheidKrJahr || ''}
          name="entscheidKrJahr"
          onChange={change}
          bsSize="small"
          tabIndex={8 + tabsToAdd}
        />
      </div>
      <ControlLabel className={styles.labelEntscheidRrb}>
        RRB
      </ControlLabel>
      <div className={styles.fieldEntscheidRrbNr}>
        <FormControl
          type="number"
          value={values.entscheidRrbNr || ''}
          name="entscheidRrbNr"
          onChange={change}
          bsSize="small"
          tabIndex={9 + tabsToAdd}
        />
      </div>
      <div className={styles.slashRrb}>
        <div>/</div>
      </div>
      <div className={styles.fieldEntscheidRrbJahr}>
        <FormControl
          type="number"
          value={values.entscheidRrbJahr || ''}
          name="entscheidRrbJahr"
          onChange={change}
          bsSize="small"
          tabIndex={10 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldAktenstandort}>
        <ControlLabel>
          Aktenstandort
        </ControlLabel>
        <FormControl
          type="text"
          value={values.aktenstandort || ''}
          name="aktenstandort"
          onChange={change}
          bsSize="small"
          tabIndex={11 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldAktennummer}>
        <ControlLabel>
          Nr.
        </ControlLabel>
        <FormControl
          type="text"
          value={values.aktennummer || ''}
          name="aktennummer"
          onChange={change}
          bsSize="small"
          tabIndex={12 + tabsToAdd}
        />
      </div>
    </div>
  )
}

AreaNummern.displayName = 'AreaNummern'

AreaNummern.propTypes = {
  values: PropTypes.object,
  change: PropTypes.func.isRequired,
  wrapperClass: PropTypes.string,
  nrOfGFields: PropTypes.number,
  changeComparator: PropTypes.func.isRequired,
}

export default AreaNummern
