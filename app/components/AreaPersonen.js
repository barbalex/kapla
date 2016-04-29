'use strict'

import React, { Component, PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'
import styles from './AreaPersonen.css'
import GeschaeftKontakteIntern from '../containers/GeschaeftKontakteIntern'
import GeschaeftKontakteExtern from '../containers/GeschaeftKontakteExtern'

class AreaPersonen extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    interneOptions: PropTypes.array,
    nrOfFieldsBeforePersonen: PropTypes.number,
    change: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired
  }

  verantwortlichData = () => {
    const { geschaeft, interneOptions } = this.props
    const data = interneOptions.find((o) => o.kurzzeichen === geschaeft.verantwortlich)
    if (!data) return ''
    const name = `${data.vorname} ${data.name}`
    const abt = data.abteilung ? `, ${data.abteilung}` : null
    const eMail = data.eMail ? `, ${data.eMail}` : null
    const telefon = data.telefon ? `, ${data.telefon}` : null
    return `${name}${abt}${eMail}${telefon}`
  }

  verwantwortlichOptions = () => {
    const { interneOptions } = this.props
    // sort interneOptions by kurzzeichen
    const interneOptionsSorted = _.sortBy(interneOptions, (o) => o.kurzzeichen.toLowerCase())
    const options = interneOptionsSorted.map((o, index) => {
      const space = '\xa0'.repeat(5 - o.kurzzeichen.length)
      return (
        <option key={index + 1} value={o.kurzzeichen}>{`${o.kurzzeichen}${space}${'\xa0\xa0\xa0'}${o.vorname} ${o.name}`}</option>
      )
    })
    options.unshift(<option key={0} value=""></option>)
    return options
  }

  render() {
    const { geschaeft, nrOfFieldsBeforePersonen, change, blur } = this.props

    return (
      <div className={styles.areaPersonen}>
        <div className={styles.areaPersonenTitle}>Personen</div>
        <div className={styles.areaVerantwortlichSubTitle}>Verantwortlich</div>
        <div className={styles.fieldVerantwortlich}>
          <FormControl
            componentClass="select"
            value={geschaeft.verantwortlich || ''}
            name="verantwortlich"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            tabIndex={1 + nrOfFieldsBeforePersonen}
            className={styles.verantwDropdown}
          >
            {this.verwantwortlichOptions()}
          </FormControl>
        </div>
        <div className={styles.fieldVerantwortlichName}>
          <FormControl.Static>
            {this.verantwortlichData()}
          </FormControl.Static>
        </div>
        <div className={styles.areaInterneKontakteSubTitle}>Interne Kontakte</div>
        <GeschaeftKontakteIntern tabIndex={nrOfFieldsBeforePersonen + 1} />
        <div className={styles.areaExterneKontakteSubTitle}>Externe Kontakte</div>
        <GeschaeftKontakteExtern tabIndex={nrOfFieldsBeforePersonen + 2} />
      </div>
    )
  }
}

export default AreaPersonen
