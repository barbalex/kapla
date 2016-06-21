'use strict'

import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styles from './AreaVernehmlassung.css'
import createOptions from '../src/createOptions'

const AreaVernehmlassung = ({
  geschaeft,
  statusVernehmlassungOptions,
  nrOfFieldsBeforePv,
  change,
  blur
}) =>
  <div className={styles.areaForGeschaeftsart}>
    <div className={styles.areaVernehmlassungTitle}>
      Vernehmlassung
    </div>
    <div className={styles.fieldStatusVernehmlassung}>
      <ControlLabel>
        Status
      </ControlLabel>
      <FormControl
        componentClass="select"
        value={geschaeft.statusVernehmlassung || ''}
        name="statusVernehmlassung"
        onChange={change}
        onBlur={blur}
        bsSize="small"
        tabIndex={1 + nrOfFieldsBeforePv}
      >
        {createOptions(statusVernehmlassungOptions)}
      </FormControl>
    </div>
  </div>

AreaVernehmlassung.displayName = 'AreaVernehmlassung'

AreaVernehmlassung.propTypes = {
  geschaeft: PropTypes.object,
  statusVernehmlassungOptions: PropTypes.array.isRequired,
  nrOfFieldsBeforePv: PropTypes.number,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired
}

export default AreaVernehmlassung
