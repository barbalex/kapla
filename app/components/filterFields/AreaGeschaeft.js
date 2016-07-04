'use strict'

import React, { PropTypes } from 'react'
import { FormControl, ControlLabel, InputGroup } from 'react-bootstrap'
import styles from './areaGeschaeft.css'
import ComparatorSelector from '../../containers/filterFields/ComparatorSelector'
import SelectInput from '../../containers/filterFields/SelectInput'
import TextInput from '../../containers/filterFields/TextInput'
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
        <TextInput
          name="gegenstand"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={1 + tabsToAdd}
          autoFocus={wrapperClass !== styles.wrapperNarrow}
        />
      </div>
      <div className={styles.fieldAusloeser}>
        <ControlLabel>
          Auslöser
        </ControlLabel>
        <TextInput
          name="ausloeser"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={2 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldOrt}>
        <ControlLabel>
          Ort
        </ControlLabel>
        <TextInput
          name="ort"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={3 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldGeschaeftsart}>
        <ControlLabel>
          Geschäftsart
        </ControlLabel>
        <SelectInput
          name="geschaeftsart"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={4 + tabsToAdd}
          options={geschaeftsartOptions}
        />
      </div>
      <div className={styles.fieldStatus}>
        <ControlLabel>
          Status
        </ControlLabel>
        <SelectInput
          name="status"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={5 + tabsToAdd}
          options={statusOptions}
        />
      </div>
      <div className={styles.fieldAbteilung}>
        <ControlLabel>
          Abteilung
        </ControlLabel>
        <SelectInput
          name="abteilung"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={6 + tabsToAdd}
          options={abteilungOptions}
        />
      </div>
      <div className={styles.fieldDetails}>
        <ControlLabel>
          Details
        </ControlLabel>
        <TextInput
          name="details"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={7 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldNaechsterSchritt}>
        <ControlLabel>
          Nächster Schritt
        </ControlLabel>
        <TextInput
          name="naechsterSchritt"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={8 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldVermerk}>
        <ControlLabel>
          Vermerk
        </ControlLabel>
        <TextInput
          name="vermerk"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={9 + tabsToAdd}
        />
      </div>
      <div className={styles.fieldVermerkIntern}>
        <ControlLabel>
          Vermerk intern (in Berichten nicht angezeigt)
        </ControlLabel>
        <TextInput
          name="vermerkIntern"
          change={change}
          values={values}
          changeComparator={changeComparator}
          tabIndex={10 + tabsToAdd}
        />
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
