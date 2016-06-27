'use strict'

import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styles from './AreaZuletztMutiert.css'

const AreaZuletztMutiert = ({
  values,
  interneOptions,
  change,
  nrOfFieldsBeforeZuletztMutiert
}) => {

  return (
    <div className={styles.areaZuletztMutiert}>
      <div className={styles.fieldMutationsperson}>
        <ControlLabel>
          Auslöser
        </ControlLabel>
        <FormControl
          type="text"
          value={values.mutationsperson || ''}
          name="mutationsperson"
          onChange={change}
          bsSize="small"
          tabIndex={1 + nrOfFieldsBeforeZuletztMutiert}
        />
      </div>
    </div>
  )
}

AreaZuletztMutiert.displayName = 'AreaZuletztMutiert'

AreaZuletztMutiert.propTypes = {
  values: PropTypes.object,
  interneOptions: PropTypes.array,
  nrOfFieldsBeforePersonen: PropTypes.number,
  change: PropTypes.func.isRequired
}

export default AreaZuletztMutiert
