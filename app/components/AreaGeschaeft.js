'use strict'

import React, { Component, PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styles from './AreaGeschaeft.css'
import createOptions from '../src/createOptions'

class AreaGeschaeft extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    rechtsmittelerledigungOptions: PropTypes.array.isRequired,
    statusOptions: PropTypes.array.isRequired,
    geschaeftsartOptions: PropTypes.array.isRequired,
    change: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired,
    wrapperClass: PropTypes.string,
    nrOfNrFields: PropTypes.number
  }

  render = () => {
    const {
      geschaeft,
      rechtsmittelerledigungOptions,
      statusOptions,
      geschaeftsartOptions,
      wrapperClass,
      change,
      blur,
      nrOfNrFields
    } = this.props

    return (
      <div className={styles.areaGeschaeft}>
        <div className={styles.fieldGegenstand}>
          <div className={styles.areaGeschaeftTitle}>Geschäft</div>
          <ControlLabel>Gegenstand</ControlLabel>
          <FormControl
            componentClass="textarea"
            value={geschaeft.gegenstand || ''}
            name="gegenstand"
            onChange={change}
            onBlur={blur}
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
            onChange={change}
            onBlur={blur}
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
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={3 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
          >
            {createOptions(geschaeftsartOptions)}
          </FormControl>
        </div>
        <div className={styles.fieldStatus}>
          <ControlLabel>Status</ControlLabel>
          <FormControl
            componentClass="select"
            value={geschaeft.status || ''}
            name="status"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={4 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
          >
            {createOptions(statusOptions)}
          </FormControl>
        </div>
        <div className={styles.fieldDirektion}>
          <ControlLabel>Direktion</ControlLabel>
          <FormControl
            type="text"
            value={geschaeft.zustaendigeDirektion || ''}
            name="zustaendigeDirektion"
            onChange={change}
            onBlur={blur}
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
            onChange={change}
            onBlur={blur}
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
            onChange={change}
            onBlur={blur}
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
            onChange={change}
            onBlur={blur}
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
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={10 + (wrapperClass === styles.wrapperNarrow ? nrOfNrFields : 0)}
          >
            {createOptions(rechtsmittelerledigungOptions)}
          </FormControl>
        </div>
      </div>
    )
  }
}

export default AreaGeschaeft
