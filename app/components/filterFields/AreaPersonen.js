'use strict'

import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'
import styles from './AreaPersonen.css'

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
      <option key={index + 1} value={o.kurzzeichen}>
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
      value={o.id}
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
    o.kurzzeichen === values.kontaktExternVornameName
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
  externeOptions
}) =>
  <div className={styles.areaPersonen}>
    <div className={styles.areaPersonenTitle}>
      Personen
    </div>
    <div className={styles.areaVerantwortlichSubTitle}>
      <div className={styles.areaSubTitleDiv}>
        Verantwortlich
      </div>
    </div>
    <div className={styles.KontaktInternVornameName}>
      <FormControl
        componentClass="select"
        value={values.verantwortlich || ''}
        name="verantwortlich"
        onChange={change}
        bsSize="small"
        tabIndex={1 + nrOfFieldsBeforePersonen}
        className={styles.verantwDropdown}
      >
        {interneOptionsList(interneOptions)}
      </FormControl>
    </div>
    <div className={styles.fieldVerantwortlichName}>
      <FormControl.Static>
        {verantwortlichData(values, interneOptions)}
      </FormControl.Static>
    </div>
    <div className={styles.areaInterneKontakteSubTitle}>
      <div className={styles.areaSubTitleDiv}>
        Interne Kontakte
      </div>
    </div>
    <div className={styles.KontaktInternVornameName}>
      <FormControl
        componentClass="select"
        value={values.kontaktInternVornameName || ''}
        name="kontaktInternVornameName"
        onChange={change}
        bsSize="small"
        tabIndex={2 + nrOfFieldsBeforePersonen}
        className={styles.verantwDropdown}
      >
        {interneOptionsList(interneOptions)}
      </FormControl>
    </div>
    <div className={styles.fieldVerantwortlichName}>
      <FormControl.Static>
        {interneData(values, interneOptions)}
      </FormControl.Static>
    </div>

    <div className={styles.areaExterneKontakteSubTitle}>
      <div className={styles.areaSubTitleDiv}>
        Externe Kontakte
      </div>
    </div>
    <div className={styles.KontaktInternVornameName}>
      <FormControl
        componentClass="select"
        value={values.kontaktExternVornameName || ''}
        name="kontaktExternVornameName"
        onChange={change}
        bsSize="small"
        tabIndex={3 + nrOfFieldsBeforePersonen}
        className={styles.verantwDropdown}
      >
        {externeOptionsList(externeOptions)}
      </FormControl>
    </div>
    <div className={styles.fieldVerantwortlichName}>
      <FormControl.Static>
        {externeData(values, externeOptions)}
      </FormControl.Static>
    </div>
  </div>

AreaPersonen.displayName = 'AreaPersonen'

AreaPersonen.propTypes = {
  values: PropTypes.object,
  interneOptions: PropTypes.array,
  externeOptions: PropTypes.array,
  nrOfFieldsBeforePersonen: PropTypes.number,
  change: PropTypes.func.isRequired
}

export default AreaPersonen
