'use strict'

import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import styles from './AreaGeschaeft.css'
import createOptions from '../../src/createOptions'

const AreaGeschaeft = ({
  statusOptions,
  geschaeftsartOptions,
  wrapperClass,
  change,
  values,
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
          type="text"
          value={values.gegenstand || ''}
          name="gegenstand"
          onChange={change}
          tabIndex={1 + tabsToAdd}
          autoFocus={wrapperClass !== styles.wrapperNarrow}
        />
      </div>
      <div className={styles.fieldAusloeser}>
        <ControlLabel>
          Auslöser
        </ControlLabel>
        <FormControl
          type="text"
          value={values.ausloeser || ''}
          name="ausloeser"
          onChange={change}
          bsSize="small"
          tabIndex={2 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldOrt}>
        <ControlLabel>
          Ort
        </ControlLabel>
        <FormControl
          type="text"
          value={values.ort || ''}
          name="ort"
          onChange={change}
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
          value={values.geschaeftsart || ''}
          name="geschaeftsart"
          onChange={change}
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
          value={values.status || ''}
          name="status"
          onChange={change}
          bsSize="small"
          tabIndex={5 + tabsToAdd}
        >
          {createOptions(statusOptions)}
        </FormControl>
      </div>
      <div className={styles.fieldAbteilung}>
        <ControlLabel>
          Abteilung
        </ControlLabel>
        <FormControl
          type="text"
          value={values.abteilung || ''}
          name="abteilung"
          onChange={change}
          bsSize="small"
          tabIndex={6 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldDetails}>
        <ControlLabel>
          Details
        </ControlLabel>
        <FormControl
          type="text"
          value={values.details || ''}
          name="details"
          onChange={change}
          bsSize="small"
          tabIndex={7 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldNaechsterSchritt}>
        <ControlLabel>
          Nächster Schritt
        </ControlLabel>
        <FormControl
          type="text"
          value={values.naechsterSchritt || ''}
          name="naechsterSchritt"
          onChange={change}
          bsSize="small"
          tabIndex={8 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldVermerk}>
        <ControlLabel>
          Vermerk
        </ControlLabel>
        <FormControl
          type="text"
          value={values.vermerk || ''}
          name="vermerk"
          onChange={change}
          bsSize="small"
          tabIndex={9 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldVermerkIntern}>
        <ControlLabel>
          Vermerk intern (in Berichten nicht angezeigt)
        </ControlLabel>
        <FormControl
          type="text"
          value={values.vermerkIntern || ''}
          name="vermerkIntern"
          onChange={change}
          bsSize="small"
          tabIndex={9 + tabsToAdd}
        />
      </div>
    </div>
  )
}

AreaGeschaeft.displayName = 'AreaGeschaeft'

AreaGeschaeft.propTypes = {
  statusOptions: PropTypes.array.isRequired,
  geschaeftsartOptions: PropTypes.array.isRequired,
  change: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  wrapperClass: PropTypes.string,
  nrOfNrFields: PropTypes.number
}

export default AreaGeschaeft
