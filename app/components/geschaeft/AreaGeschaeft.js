'use strict'

import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import Textarea from 'react-textarea-autosize'
import styles from './areaGeschaeft.css'
import createOptions from '../../src/createOptions'

const AreaGeschaeft = ({
  geschaeft,
  statusOptions,
  geschaeftsartOptions,
  abteilungOptions,
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
        <Textarea
          value={geschaeft.gegenstand || ''}
          name="gegenstand"
          onChange={change}
          onBlur={blur}
          tabIndex={1 + tabsToAdd}
          autoFocus={wrapperClass !== styles.wrapperNarrow}
          className={styles.textarea}
        />
      </div>
      <div className={styles.fieldAusloeser}>
        <ControlLabel>
          Auslöser
        </ControlLabel>
        <Textarea
          value={geschaeft.ausloeser || ''}
          name="ausloeser"
          onChange={change}
          onBlur={blur}
          tabIndex={2 + tabsToAdd}
          className={styles.textarea}
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
      <div className={styles.fieldAbteilung}>
        <ControlLabel>
          Abteilung
        </ControlLabel>
        <FormControl
          componentClass="select"
          value={geschaeft.abteilung || ''}
          name="abteilung"
          onChange={change}
          onBlur={blur}
          bsSize="small"
          tabIndex={6 + tabsToAdd}
        >
          {createOptions(abteilungOptions)}
        </FormControl>
      </div>
      <div className={styles.fieldDetails}>
        <ControlLabel>
          Details
        </ControlLabel>
        <Textarea
          value={geschaeft.details || ''}
          name="details"
          onChange={change}
          onBlur={blur}
          tabIndex={7 + tabsToAdd}
          className={styles.textarea}
        />
      </div>
      <div className={styles.fieldNaechsterSchritt}>
        <ControlLabel>
          Nächster Schritt
        </ControlLabel>
        <Textarea
          value={geschaeft.naechsterSchritt || ''}
          name="naechsterSchritt"
          onChange={change}
          onBlur={blur}
          tabIndex={8 + tabsToAdd}
          className={styles.textarea}
        />
      </div>
      <div className={styles.fieldVermerk}>
        <ControlLabel>
          Vermerk
        </ControlLabel>
        <Textarea
          value={geschaeft.vermerk || ''}
          name="vermerk"
          onChange={change}
          onBlur={blur}
          tabIndex={9 + tabsToAdd}
          className={styles.textarea}
        />
      </div>
      <div className={styles.fieldVermerkIntern}>
        <ControlLabel>
          Vermerk intern (in Berichten nicht angezeigt)
        </ControlLabel>
        <Textarea
          value={geschaeft.vermerkIntern || ''}
          name="vermerkIntern"
          onChange={change}
          onBlur={blur}
          tabIndex={9 + tabsToAdd}
          className={styles.textarea}
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
