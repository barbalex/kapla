'use strict'

import React, { PropTypes } from 'react'
import { FormControl, ControlLabel, InputGroup } from 'react-bootstrap'
import ComparatorSelector from '../../containers/filterFields/ComparatorSelector'
import styles from './areaHistory.css'

const AreaHistory = ({
  values,
  change,
  changeComparator,
  firstTabIndex,
}) =>
  <div className={styles.areaHistory}>
    <div className={styles.areaHistoryTitle}>
      Historie
    </div>
    <ControlLabel>
      Vorgeschäft
    </ControlLabel>
    <div className={styles.fieldVorgeschaeft}>
      <InputGroup>
        <ComparatorSelector
          name="idVorgeschaeft"
          changeComparator={changeComparator}
        />
        <FormControl
          type="number"
          value={values.idVorgeschaeft || ''}
          name="idVorgeschaeft"
          onChange={change}
          bsSize="small"
          placeholder="ID"
          tabIndex={firstTabIndex + 1}
        />
      </InputGroup>
    </div>
  </div>

AreaHistory.displayName = 'AreaHistory'

AreaHistory.propTypes = {
  values: PropTypes.object,
  change: PropTypes.func.isRequired,
  changeComparator: PropTypes.func.isRequired,
  firstTabIndex: PropTypes.number.isRequired,
}

export default AreaHistory
