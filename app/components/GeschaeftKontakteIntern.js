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

  onChangeNewKontaktIntern = (e) => {
    const { geschaeftKontaktInternNewCreate, activeId } = this.props
    const idKontakt = e.target.value
    geschaeftKontaktInternNewCreate(activeId, idKontakt)
    // need to empty dropdown
    e.target.value = ''
  }

  onClickRemove = (idKontakt) => {
    const { activeId, geschaeftKontaktInternRemove } = this.props
    geschaeftKontaktInternRemove(activeId, idKontakt)
  }

  options = () => {
    const { interneOptions } = this.props
    // sort interneOptions by kurzzeichen
    const interneOptionsSorted = _.sortBy(interneOptions, (o) => o.kurzzeichen.toLowerCase())
    const options = interneOptionsSorted.map((o, index) => {
      const space = '\xa0'.repeat(5 - o.kurzzeichen.length)
      return (
        <option key={index + 1} value={o.id}>{`${o.kurzzeichen}${space}${'\xa0\xa0\xa0'}${o.vorname} ${o.name}`}</option>
      )
    })
    options.unshift(<option key={0} value=""></option>)
    return options
  }

  verantwortlichData = (gkI) => {
    const { interneOptions } = this.props
    const data = interneOptions.find((o) => o.id === gkI.idKontakt)
    if (!data) return ''
    const name = `${data.vorname} ${data.name}`
    const abt = data.abteilung ? `, ${data.abteilung}` : ''
    const eMail = data.eMail ? `, ${data.eMail}` : ''
    const telefon = data.telefon ? `, ${data.telefon}` : ''
    return `${name}${abt}${eMail}${telefon}`
  }

  renderItems() {
    const { geschaefteKontakteIntern, activeId, interneOptions } = this.props
    // filter for this geschaeft
    const gkIFiltered = geschaefteKontakteIntern.filter((g) => g.idGeschaeft === activeId)
    const gkISorted = _.sortBy(gkIFiltered, (g) => {
      const intOption = interneOptions.find((o) => o.id === g.idKontakt)
      return intOption.kurzzeichen.toLowerCase()
    })
    return gkISorted.map((gkI, index) => {
      const intOption = interneOptions.find((o) => o.id === gkI.idKontakt)
      const kurzzeichen = intOption.kurzzeichen
      return (
        <div key={index + 1} className={styles.row}>
          <div className={styles.fV}>
            <FormControl
              type="text"
              value={kurzzeichen}
              bsSize="small"
              className={styles.kontaktSelect}
              // react enforces onChange handler when value is used
              onChange={() => ''}
              disabled
            />
          </div>
          <div className={styles.fVN}>
            <FormControl.Static>
              {this.verantwortlichData(gkI)}
            </FormControl.Static>
          </div>
          <div className={styles.deleteGlyphiconDiv}>
            <Glyphicon
              glyph="remove-circle"
              onClick={this.onClickRemove.bind(this, gkI.idKontakt)}
              className={styles.removeGlyphicon}
              title="Kontakt entfernen"
            />
          </div>
        </div>
      )
    })
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
              className={styles.dropdown}
              onChange={this.onChangeNewKontaktIntern}
              title="Neuen Kontakt hinzufügen"
            >
              {this.options(geschaefteKontakteIntern[0])}
            </FormControl>
          </div>
        </div>
      </div>
    )
  }
}

export default GeschaefteKontakteIntern
