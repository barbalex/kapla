'use strict'

import React, { PropTypes } from 'react'
import { FormControl, ControlLabel, InputGroup } from 'react-bootstrap'
import styles from './areaGeschaeft.css'
import ComparatorSelector from '../../containers/filterFields/ComparatorSelector'
import createOptions from '../../src/createOptions'

const AreaGeschaeft = ({
  statusOptions,
  geschaeftsartOptions,
  abteilungOptions,
  wrapperClass,
  change,
  values,
  nrOfGFields,
  changeComparator,
}) => {
  const tabsToAdd = (
    wrapperClass === styles.wrapperNarrow ?
    nrOfGFields :
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
        <InputGroup>
          <ComparatorSelector
            name="gegenstand"
            changeComparator={changeComparator}
          />
          <FormControl
            type="text"
            value={values.gegenstand || ''}
            name="gegenstand"
            onChange={change}
            tabIndex={1 + tabsToAdd}
            autoFocus={wrapperClass !== styles.wrapperNarrow}
          />
        </InputGroup>
      </div>
      <div className={styles.fieldAusloeser}>
        <ControlLabel>
          Auslöser
        </ControlLabel>
        <InputGroup>
          <ComparatorSelector
            name="ausloeser"
            changeComparator={changeComparator}
          />
          <FormControl
            type="text"
            value={values.ausloeser || ''}
            name="ausloeser"
            onChange={change}
            bsSize="small"
            tabIndex={2 + tabsToAdd}
          />
        </InputGroup>
      </div>
      <div className={styles.fieldOrt}>
        <ControlLabel>
          Ort
        </ControlLabel>
        <InputGroup>
          <ComparatorSelector
            name="ort"
            changeComparator={changeComparator}
          />
          <FormControl
            type="text"
            value={values.ort || ''}
            name="ort"
            onChange={change}
            bsSize="small"
            tabIndex={3 + tabsToAdd}
          />
        </InputGroup>
      </div>
      <div className={styles.fieldGeschaeftsart}>
        <ControlLabel>
          Geschäftsart
        </ControlLabel>
        <InputGroup>
          <ComparatorSelector
            name="geschaeftsart"
            changeComparator={changeComparator}
          />
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
        </InputGroup>
      </div>
      <div className={styles.fieldStatus}>
        <ControlLabel>
          Status
        </ControlLabel>
        <InputGroup>
          <ComparatorSelector
            name="status"
            changeComparator={changeComparator}
          />
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
        </InputGroup>
      </div>
      <div className={styles.fieldAbteilung}>
        <ControlLabel>
          Abteilung
        </ControlLabel>
        <InputGroup>
          <ComparatorSelector
            name="abteilung"
            changeComparator={changeComparator}
          />
          <FormControl
            componentClass="select"
            value={values.abteilung || ''}
            name="abteilung"
            onChange={change}
            bsSize="small"
            tabIndex={6 + tabsToAdd}
          >
            {createOptions(abteilungOptions)}
          </FormControl>
        </InputGroup>
      </div>
      <div className={styles.fieldDetails}>
        <ControlLabel>
          Details
        </ControlLabel>
        <InputGroup>
          <ComparatorSelector
            name="details"
            changeComparator={changeComparator}
          />
          <FormControl
            type="text"
            value={values.details || ''}
            name="details"
            onChange={change}
            bsSize="small"
            tabIndex={7 + tabsToAdd}
          />
        </InputGroup>
      </div>
      <div className={styles.fieldNaechsterSchritt}>
        <ControlLabel>
          Nächster Schritt
        </ControlLabel>
        <InputGroup>
          <ComparatorSelector
            name="naechsterSchritt"
            changeComparator={changeComparator}
          />
          <FormControl
            type="text"
            value={values.naechsterSchritt || ''}
            name="naechsterSchritt"
            onChange={change}
            bsSize="small"
            tabIndex={8 + tabsToAdd}
          />
        </InputGroup>
      </div>
      <div className={styles.fieldVermerk}>
        <ControlLabel>
          Vermerk
        </ControlLabel>
        <InputGroup>
          <ComparatorSelector
            name="vermerk"
            changeComparator={changeComparator}
          />
          <FormControl
            type="text"
            value={values.vermerk || ''}
            name="vermerk"
            onChange={change}
            bsSize="small"
            tabIndex={9 + tabsToAdd}
          />
        </InputGroup>
      </div>
      <div className={styles.fieldVermerkIntern}>
        <ControlLabel>
          Vermerk intern (in Berichten nicht angezeigt)
        </ControlLabel>
        <InputGroup>
          <ComparatorSelector
            name="vermerkIntern"
            changeComparator={changeComparator}
          />
          <FormControl
            type="text"
            value={values.vermerkIntern || ''}
            name="vermerkIntern"
            onChange={change}
            bsSize="small"
            tabIndex={9 + tabsToAdd}
          />
        </InputGroup>
      </div>
    </div>
  )
}

AreaGeschaeft.displayName = 'AreaGeschaeft'

/**
 * do not make options required
 * as they may be loaded after the component
 */
AreaGeschaeft.propTypes = {
  statusOptions: PropTypes.array,
  geschaeftsartOptions: PropTypes.array,
  abteilungOptions: PropTypes.array,
  change: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  wrapperClass: PropTypes.string.isRequired,
  nrOfGFields: PropTypes.number.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default AreaGeschaeft
