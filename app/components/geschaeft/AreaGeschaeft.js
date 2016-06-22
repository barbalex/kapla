'use strict'

import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styles from './AreaGeschaeft.css'
import createOptions from '../../src/createOptions'

const AreaGeschaeft = ({
  geschaeft,
  statusOptions,
  geschaeftsartOptions,
  wrapperClass,
  change,
  blur,
  nrOfNrFields
}) => {
  const tabsToAdd = (
    wrapperClass === styles.wrapperNarrow ?
    nrOfNrFields :
    0
  )

  return (
    <div className={styles.areaGeschaeft}>
      <div className={styles.areaGeschaeftTitle}>
        Geschäft
      </div>
      <div className={styles.fieldGegenstand}>
        <ControlLabel>
          Gegenstand
        </ControlLabel>
        <FormControl
          componentClass="textarea"
          value={geschaeft.gegenstand || ''}
          name="gegenstand"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          rows={2}
          tabIndex={1 + tabsToAdd}
          autoFocus={wrapperClass !== styles.wrapperNarrow}
        />
      </div>
      <div className={styles.fieldAusloeser}>
        <ControlLabel>
          Auslöser
        </ControlLabel>
        <FormControl
          componentClass="textarea"
          value={geschaeft.ausloeser || ''}
          name="ausloeser"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          rows={1}
          tabIndex={2 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldOrt}>
        <ControlLabel>
          Ort
        </ControlLabel>
        <FormControl
          type="text"
          value={geschaeft.ort || ''}
          name="ort"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={3 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldGeschaeftsart}>
        <ControlLabel>
          Geschäftsart
        </ControlLabel>
        <FormControl
          componentClass="select"
          value={geschaeft.geschaeftsart || ''}
          name="geschaeftsart"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={4 + tabsToAdd}
        >
          {createOptions(geschaeftsartOptions)}
        </FormControl>
      </div>
      <div className={styles.fieldStatus}>
        <ControlLabel>
          Status
        </ControlLabel>
        <FormControl
          componentClass="select"
          value={geschaeft.status || ''}
          name="status"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={5 + tabsToAdd}
        >
          {createOptions(statusOptions)}
        </FormControl>
      </div>
      <div className={styles.fieldDirektion}>
        <ControlLabel>
          Direktion
        </ControlLabel>
        <FormControl
          type="text"
          value={geschaeft.zustaendigeDirektion || ''}
          name="zustaendigeDirektion"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={6 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldDetails}>
        <ControlLabel>
          Details
        </ControlLabel>
        <FormControl
          componentClass="textarea"
          value={geschaeft.details || ''}
          name="details"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          rows={4}
          tabIndex={7 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldNaechsterSchritt}>
        <ControlLabel>
          Nächster Schritt
        </ControlLabel>
        <FormControl
          componentClass="textarea"
          value={geschaeft.naechsterSchritt || ''}
          name="naechsterSchritt"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          rows={4}
          tabIndex={8 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldVermerk}>
        <ControlLabel>
          Vermerk
        </ControlLabel>
        <FormControl
          componentClass="textarea"
          value={geschaeft.vermerk || ''}
          name="vermerk"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          rows={4}
          tabIndex={9 + tabsToAdd}
        />
      </div>
    </div>
  )
}

AreaGeschaeft.displayName = 'AreaGeschaeft'

AreaGeschaeft.propTypes = {
  geschaeft: PropTypes.object,
  statusOptions: PropTypes.array.isRequired,
  geschaeftsartOptions: PropTypes.array.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
  wrapperClass: PropTypes.string,
  nrOfNrFields: PropTypes.number
}

export default AreaGeschaeft
