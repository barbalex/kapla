'use strict'

import React, { Component, PropTypes } from 'react'
import { FormControl, Glyphicon } from 'react-bootstrap'
import _ from 'lodash'
import styles from './GeschaeftKontakteIntern.css'

class GeschaefteKontakteIntern extends Component {
  static propTypes = {
    interneOptions: PropTypes.array.isRequired,
    geschaefteKontakteIntern: PropTypes.array.isRequired,
    activeIdGeschaeft: PropTypes.number,
    activeIdKontakt: PropTypes.number,
    geschaeftKontaktInternNewCreate: PropTypes.func.isRequired,
    geschaeftKontaktInternRemove: PropTypes.func.isRequired,
    activeId: PropTypes.number.isRequired
  }

  options = () => {
    const { interneOptions } = this.props
    // sort interneOptions by kurzzeichen
    const interneOptionsSorted = _.sortBy(interneOptions, (o) => o.kurzzeichen)
    const options = interneOptionsSorted.map((o, index) =>
      <option key={index + 1} value={o.id}>{o.kurzzeichen}</option>
    )
    options.unshift(<option key={0} value=""></option>)
    return options
  }

  verantwortlichData = (gkI) => {
    const { interneOptions } = this.props
    const data = interneOptions.find((o) => o.id === gkI.idKontakt)
    if (!data) return ''
    const name = `${data.vorname} ${data.name}`
    const abt = data.abteilung ? `, ${data.abteilung}` : null
    const eMail = data.eMail ? `, ${data.eMail}` : null
    const telefon = data.telefon ? `, ${data.telefon}` : null
    return `${name}${abt}${eMail}${telefon}`
  }

  onChangeNewKontaktIntern = (e) => {
    const { geschaeftKontaktInternNewCreate, activeId } = this.props
    const idKontakt = e.target.value
    geschaeftKontaktInternNewCreate(activeId, idKontakt)
  }

  onClickRemove = (idKontakt) => {
    const { activeId, geschaeftKontaktInternRemove } = this.props
    console.log('idKontakt', idKontakt)
    console.log('activeId', activeId)
    geschaeftKontaktInternRemove(activeId, idKontakt)
  }

  renderItems() {
    const { geschaefteKontakteIntern, activeId } = this.props
    // filter for this geschaeft
    const gkIFiltered = geschaefteKontakteIntern.filter((g) => g.idGeschaeft === activeId)
    return gkIFiltered.map((gkI, index) => (
      <div key={index + 1} className={styles.row}>
        <div className={styles.fV}>
          <FormControl
            componentClass="select"
            defaultValue={gkI.idKontakt}
            bsSize="small"
            className={styles.input}
          >
            {this.options(gkI)}
          </FormControl>
        </div>
        <div className={styles.fVN}>
          <FormControl.Static>
            {this.verantwortlichData(gkI)}
          </FormControl.Static>
        </div>
        <Glyphicon
          glyph="remove-circle"
          onClick={this.onClickRemove.bind(this, gkI.idKontakt)}
          className={styles.removeGlyphicon}
        /> 
      </div>
    ))
  }

  render = () => {
    const { geschaefteKontakteIntern } = this.props
    return (
      <div className={styles.body}>
        {this.renderItems()}
        <div key={0} className={styles.row}>
          <div className={styles.fV}>
            <FormControl
              componentClass="select"
              bsSize="small"
              className={styles.input}
              onChange={this.onChangeNewKontaktIntern}
            >
              {this.options(geschaefteKontakteIntern[0])}
            </FormControl>
          </div>
          <div className={styles.fVN}>
            <FormControl.Static>
              {null}
            </FormControl.Static>
          </div>
        </div>
      </div>
    )
  }
}

export default GeschaefteKontakteIntern
