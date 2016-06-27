'use strict'

import React, { PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import _ from 'lodash'
import styles from './AreaZuletztMutiert.css'

const interneOptionsList = (interneOptions) => {
  // sort interneOptions by kurzzeichen
  const interneOptionsWithItKonto = interneOptions.filter((o) => !!o.itKonto)
  const interneOptionsSorted = _.sortBy(interneOptionsWithItKonto, (o) =>
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
      <option key={index + 1} value={o.itKonto}>
        {`${o.kurzzeichen}${space}${'\xa0\xa0\xa0'}${name}`}
      </option>
    )
  })
  options.unshift(<option key={0} value=""></option>)
  return options
}

const interneData = (values, interneOptions) => {
  const data = interneOptions.find((o) =>
    o.itKonto === values.mutationsperson
  )
  if (!data) return ''
  const name = `${data.vorname || ''} ${data.name || ''}`
  const abt = data.abteilung ? `, ${data.abteilung}` : ''
  const eMail = data.eMail ? `, ${data.eMail}` : ''
  const telefon = data.telefon ? `, ${data.telefon}` : ''
  return `${name}${abt}${eMail}${telefon}`
}

const AreaZuletztMutiert = ({
  values,
  interneOptions,
  change,
  nrOfFieldsBeforeZuletztMutiert
}) =>
  <div className={styles.areaZuletztMutiert}>
    <div className={styles.fieldVerantwortlich}>
      <ControlLabel>
        Mutations-Person
      </ControlLabel>
      <FormControl
        componentClass="select"
        value={values.mutationsperson || ''}
        name="mutationsperson"
        onChange={change}
        bsSize="small"
        tabIndex={1 + nrOfFieldsBeforeZuletztMutiert}
        className={styles.narrowVerantwDropdown}
      >
        {interneOptionsList(interneOptions)}
      </FormControl>
    </div>
    <div className={styles.fieldVerantwortlichName}>
      <FormControl.Static>
        {interneData(values, interneOptions)}
      </FormControl.Static>
    </div>
  </div>

AreaZuletztMutiert.displayName = 'AreaZuletztMutiert'

AreaZuletztMutiert.propTypes = {
  values: PropTypes.object,
  interneOptions: PropTypes.array,
  nrOfFieldsBeforeZuletztMutiert: PropTypes.number,
  change: PropTypes.func.isRequired
}

export default AreaZuletztMutiert
