'use strict'

import React, { Component, PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styles from './AreaVernehmlassung.css'
import createOptions from '../src/createOptions'

class AreaVernehmlassung extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    statusVernehmlassungOptions: PropTypes.array.isRequired,
    nrOfFieldsBeforePv: PropTypes.number,
    change: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired
  }

  render = () => {
    const {
      geschaeft,
      statusVernehmlassungOptions,
      nrOfFieldsBeforePv,
      change,
      blur
    } = this.props

    return (
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
    )
  }
}

export default AreaVernehmlassung
