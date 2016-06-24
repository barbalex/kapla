'use strict'

import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'
import styles from './AreaPersonen.css'
import KontakteIntern from '../../containers/filterFields/KontakteIntern'
import KontakteExtern from '../../containers/filterFields/KontakteExtern'

const verwantwortlichOptions = (interneOptions) => {
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

const AreaPersonen = ({
  values,
  nrOfFieldsBeforePersonen = 0,
  change,
  interneOptions
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
    <div className={styles.fieldVerantwortlich}>
      <FormControl
        componentClass="select"
        value={values.verantwortlich || ''}
        name="verantwortlich"
        onChange={change}
        bsSize="small"
        tabIndex={1 + nrOfFieldsBeforePersonen}
        className={styles.verantwDropdown}
      >
        {verwantwortlichOptions(interneOptions)}
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
    <KontakteIntern
      tabIndex={nrOfFieldsBeforePersonen + 1}
    />
    <div className={styles.areaExterneKontakteSubTitle}>
      <div className={styles.areaSubTitleDiv}>
        Externe Kontakte
      </div>
    </div>
    <KontakteExtern
      tabIndex={nrOfFieldsBeforePersonen + 2}
    />
  </div>

AreaPersonen.displayName = 'AreaPersonen'

AreaPersonen.propTypes = {
  values: PropTypes.object,
  interneOptions: PropTypes.array,
  nrOfFieldsBeforePersonen: PropTypes.number,
  change: PropTypes.func.isRequired
}

export default AreaPersonen
