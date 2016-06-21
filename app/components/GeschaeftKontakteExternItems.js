'use strict'

import React, { Component, PropTypes } from 'react'
import { Glyphicon } from 'react-bootstrap'
import _ from 'lodash'
import styles from './GeschaeftKontakteExtern.css'

class GeschaefteKontakteExtern extends Component {
  static propTypes = {
    externeOptions: PropTypes.array.isRequired,
    geschaefteKontakteExtern: PropTypes.array.isRequired,
    geschaeftKontaktExternRemove: PropTypes.func.isRequired,
    activeId: PropTypes.number.isRequired
  }

  onClickRemove = (idKontakt) => {
    const { activeId, geschaeftKontaktExternRemove } = this.props
    geschaeftKontaktExternRemove(activeId, idKontakt)
  }

  verantwortlichData = (gkI) => {
    function addValueToInfo(info, value) {
      if (!value) return info
      if (info) return `${info}, ${value}`
      return value
    }
    const { externeOptions } = this.props
    const data = externeOptions.find((o) =>
      o.id === gkI.idKontakt
    )
    if (!data) return ''
    let info = ''
    info = addValueToInfo(info, data.firma)
    info = addValueToInfo(info, data.email)
    info = addValueToInfo(info, data.telefon)
    return info
  }

  titleText = (idKontakt) => {
    const { externeOptions } = this.props
    const data = externeOptions.find((o) =>
      o.id === idKontakt
    )
    if (!data) return 'Kontakt entfernen'
    return `${data.name} ${data.vorname} entfernen`
  }

  render = () => {
    const {
      geschaefteKontakteExtern,
      activeId,
      externeOptions
    } = this.props
    // filter for this geschaeft
    const gkIFiltered = geschaefteKontakteExtern.filter((g) =>
      g.idGeschaeft === activeId
    )
    const gKISorted = _.sortBy(gkIFiltered, (g) => {
      const intOption = externeOptions.find((o) =>
        o.id === g.idKontakt
      )
      return `${intOption.name} ${intOption.vorname}`.toLowerCase()
    })
    return (
      <div className={styles.body}>
        {
          gKISorted.map((gkI, index) => {
            const intOption = externeOptions.find((o) =>
              o.id === gkI.idKontakt
            )
            const nameVorname = intOption.nameVorname
            return (
              <div
                key={index + 1}
                className={styles.row}
              >
                <div className={styles.fV}>
                  {nameVorname}
                </div>
                <div className={styles.fVN}>
                  {this.verantwortlichData(gkI)}
                </div>
                <div className={styles.deleteGlyphiconDiv}>
                  <Glyphicon
                    glyph="remove-circle"
                    onClick={() => this.onClickRemove(gkI.idKontakt)}
                    className={styles.removeGlyphicon}
                    title={this.titleText(gkI.idKontakt)}
                  />
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default GeschaefteKontakteExtern
