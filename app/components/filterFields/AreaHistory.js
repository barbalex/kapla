'use strict'

import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styles from './areaHistory.css'

const AreaHistory = ({
  values,
  change,
  changeComparator,
  nrOfFieldsBeforeHistory,
}) =>
  <div className={styles.areaHistory}>
    <div className={styles.areaHistoryTitle}>
      Historie
    </div>
    <ControlLabel>
      Vorgeschäft
    </ControlLabel>
    <div className={styles.fieldVorgeschaeft}>
      <FormControl
        type="number"
        value={values.idVorgeschaeft || ''}
        name="idVorgeschaeft"
        onChange={change}
        bsSize="small"
        placeholder="ID"
        tabIndex={nrOfFieldsBeforeHistory + 1}
      />
    </div>
  </div>

AreaHistory.displayName = 'AreaHistory'

AreaHistory.propTypes = {
  values: PropTypes.object,
  change: PropTypes.func.isRequired,
  changeComparator: PropTypes.func.isRequired,
  nrOfFieldsBeforeHistory: PropTypes.number.isRequired,
}

export default AreaHistory
