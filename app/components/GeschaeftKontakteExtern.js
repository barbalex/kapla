'use strict'

import React, { Component, PropTypes } from 'react'
import { FormControl, Glyphicon } from 'react-bootstrap'
import _ from 'lodash'
import styles from './GeschaeftKontakteExtern.css'

class GeschaefteKontakteExtern extends Component {
  static propTypes = {
    externeOptions: PropTypes.array.isRequired,
    geschaefteKontakteExtern: PropTypes.array.isRequired,
    activeIdGeschaeft: PropTypes.number,
    activeIdKontakt: PropTypes.number,
    geschaeftKontaktExternNewCreate: PropTypes.func.isRequired,
    geschaeftKontaktExternRemove: PropTypes.func.isRequired,
    activeId: PropTypes.number.isRequired
  }

  onChangeNewKontaktExtern = (e) => {
    const { geschaeftKontaktExternNewCreate, activeId } = this.props
    const idKontakt = e.target.value
    geschaeftKontaktExternNewCreate(activeId, idKontakt)
    // need to empty dropdown
    e.target.value = ''
  }

  onClickRemove = (idKontakt) => {
    const { activeId, geschaeftKontaktExternRemove } = this.props
    geschaeftKontaktExternRemove(activeId, idKontakt)
  }

  options = () => {
    const { externeOptions } = this.props
    // sort externeOptions by nameVorname
    const externeOptionsSorted = _.sortBy(externeOptions, (o) => o.nameVorname.toLowerCase())
    const options = externeOptionsSorted.map((o, index) => (
      <option key={index + 1} value={o.id}>{o.nameVorname}</option>
    ))
    options.unshift(<option key={0} value=""></option>)
    return options
  }

  verantwortlichData = (gkI) => {
    function addValueToInfo(info, value) {
      if (!value) return info
      if (info) return `${info}, ${value}`
      return value
    }
    const { externeOptions } = this.props
    const data = externeOptions.find((o) => o.id === gkI.idKontakt)
    if (!data) return ''
    let info = ''
    info = addValueToInfo(info, data.firma)
    info = addValueToInfo(info, data.email)
    info = addValueToInfo(info, data.telefon)
    return info
  }

  renderItems() {
    const { geschaefteKontakteExtern, activeId, externeOptions } = this.props
    // filter for this geschaeft
    const gkIFiltered = geschaefteKontakteExtern.filter((g) => g.idGeschaeft === activeId)
    return gkIFiltered.map((gkI, index) => {
      const intOption = externeOptions.find((o) => o.id === gkI.idKontakt)
      const nameVorname = intOption.nameVorname
      return (
        <div key={index + 1} className={styles.row}>
          <div className={styles.fV}>
            <FormControl
              type="text"
              value={nameVorname}
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
    const { geschaefteKontakteExtern } = this.props
    return (
      <div className={styles.body}>
        {this.renderItems()}
        <div key={0} className={styles.row}>
          <div className={styles.fV}>
            <FormControl
              componentClass="select"
              bsSize="small"
              onChange={this.onChangeNewKontaktExtern}
              title="Neuen Kontakt hinzufügen"
            >
              {this.options(geschaefteKontakteExtern[0])}
            </FormControl>
          </div>
        </div>
      </div>
    )
  }
}

export default GeschaefteKontakteExtern
