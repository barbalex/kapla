'use strict'

import React, { PropTypes } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import _ from 'lodash'
import ComparatorSelector from '../../containers/filterFields/ComparatorSelector'
import styles from './areaPersonen.css'

const interneOptionsList = (interneOptions) => {
  // sort interneOptions by kurzzeichen
  const interneOptionsSorted = _.sortBy(interneOptions, (o) =>
    o.kurzzeichen.toLowerCase()
  )
  const options = interneOptionsSorted.map((o, index) => {
    let times = 5 - o.kurzzeichen.length
    // make sure, times is never < 0
    if (times < 0) {
      times = 0
    }
    const space = '\xa0'.repeat(times)
    const name = `${o.vorname || ''} ${o.name || ''}`
    return (
      <option
        key={index + 1}
        value={o.kurzzeichen}
      >
        {`${o.kurzzeichen}${space}${'\xa0\xa0\xa0'}${name}`}
      </option>
    )
  })
  options.unshift(<option key={0} value=""></option>)
  return options
}

const externeOptionsList = (externeOptions) => {
  // sort externeOptions by nameVorname
  const externeOptionsSorted = _.sortBy(externeOptions, (o) =>
    o.nameVorname.toLowerCase()
  )
  const options = externeOptionsSorted.map((o, index) =>
    <option
      key={index + 1}
      value={o.nameVorname}
    >
      {o.nameVorname}
    </option>
  )
  options.unshift(
    <option
      key={0}
      value=""
    >
    </option>
  )
  return options
}

const verantwortlichData = (values, interneOptions) => {
  const data = interneOptions.find((o) =>
    o.kurzzeichen === values.verantwortlich
  )
  if (!data) return ''
  const name = `${data.vorname || ''} ${data.name || ''}`
  const abt = data.abteilung ? `, ${data.abteilung}` : ''
  const eMail = data.eMail ? `, ${data.eMail}` : ''
  const telefon = data.telefon ? `, ${data.telefon}` : ''
  return `${name}${abt}${eMail}${telefon}`
}

const interneData = (values, interneOptions) => {
  const data = interneOptions.find((o) =>
    o.kurzzeichen === values.kontaktInternVornameName
  )
  if (!data) return ''
  const name = `${data.vorname || ''} ${data.name || ''}`
  const abt = data.abteilung ? `, ${data.abteilung}` : ''
  const eMail = data.eMail ? `, ${data.eMail}` : ''
  const telefon = data.telefon ? `, ${data.telefon}` : ''
  return `${name}${abt}${eMail}${telefon}`
}

const externeData = (values, externeOptions) => {
  function addValueToInfo(info, value) {
    if (!value) return info
    if (info) return `${info}, ${value}`
    return value
  }
  const data = externeOptions.find((o) =>
    o.nameVorname === values.kontaktExternNameVorname
  )
  if (!data) return ''
  let info = ''
  info = addValueToInfo(info, data.firma)
  info = addValueToInfo(info, data.email)
  info = addValueToInfo(info, data.telefon)
  return info
}

const AreaPersonen = ({
  values,
  nrOfFieldsBeforePersonen = 0,
  change,
  interneOptions,
  externeOptions,
  changeComparator,
}) =>
  <div className={styles.container}>
    <div className={styles.areaPersonen}>
      <div className={styles.areaPersonenTitle}>
        Personen
      </div>
      <div className={styles.areaVerantwortlichSubTitle}>
        Verantwortlich
      </div>
      <div className={styles.KontaktInternVornameName}>
        <InputGroup>
          <ComparatorSelector
            name="verantwortlich"
            changeComparator={changeComparator}
          />
          <FormControl
            componentClass="select"
            value={values.verantwortlich || ''}
            name="verantwortlich"
            onChange={change}
            bsSize="small"
            tabIndex={1 + nrOfFieldsBeforePersonen}
            className={styles.narrowVerantwDropdown}
          >
            {interneOptionsList(interneOptions)}
          </FormControl>
        </InputGroup>
      </div>
      <div className={styles.fieldVerantwortlichName}>
        <FormControl.Static>
          {verantwortlichData(values, interneOptions)}
        </FormControl.Static>
      </div>
      <div className={styles.areaInterneKontakteSubTitle}>
        Interne Kontakte
      </div>
      <div className={styles.KontaktInternVornameName}>
        <InputGroup>
          <ComparatorSelector
            name="kontaktInternVornameName"
            changeComparator={changeComparator}
          />
          <FormControl
            componentClass="select"
            value={values.kontaktInternVornameName || ''}
            name="kontaktInternVornameName"
            onChange={change}
            bsSize="small"
            tabIndex={2 + nrOfFieldsBeforePersonen}
            className={styles.narrowVerantwDropdown}
          >
            {interneOptionsList(interneOptions)}
          </FormControl>
        </InputGroup>
      </div>
      <div className={styles.fieldVerantwortlichName}>
        <FormControl.Static>
          {interneData(values, interneOptions)}
        </FormControl.Static>
      </div>

      <div className={styles.areaExterneKontakteSubTitle}>
        Externe Kontakte
      </div>
      <div className={styles.KontaktInternVornameName}>
        <InputGroup>
          <ComparatorSelector
            name="kontaktExternNameVorname"
            changeComparator={changeComparator}
          />
          <FormControl
            componentClass="select"
            value={values.kontaktExternNameVorname || ''}
            name="kontaktExternNameVorname"
            onChange={change}
            bsSize="small"
            tabIndex={3 + nrOfFieldsBeforePersonen}
            className={styles.verantwDropdown}
          >
            {externeOptionsList(externeOptions)}
          </FormControl>
        </InputGroup>
      </div>
      <div className={styles.fieldVerantwortlichName}>
        <FormControl.Static>
          {externeData(values, externeOptions)}
        </FormControl.Static>
      </div>
    </div>
  </div>

AreaPersonen.displayName = 'AreaPersonen'

/**
 * do not make options required
 * as they may be loaded after the component
 */
AreaPersonen.propTypes = {
  values: PropTypes.object.isRequired,
  interneOptions: PropTypes.array,
  externeOptions: PropTypes.array,
  nrOfFieldsBeforePersonen: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  changeComparator: PropTypes.func.isRequired,
}

export default AreaPersonen
