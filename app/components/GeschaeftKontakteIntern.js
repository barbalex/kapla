'use strict'

import React, { Component, PropTypes } from 'react'
import { FormControl, Glyphicon } from 'react-bootstrap'
import _ from 'lodash'
import styles from './GeschaeftKontakteIntern.css'

const onChangeNewKontaktIntern = (e, geschaeftKontaktInternNewCreate, activeId) => {
  const idKontakt = e.target.value
  geschaeftKontaktInternNewCreate(activeId, idKontakt)
  // need to empty dropdown
  e.target.value = ''
}

const titleText = (idKontakt, interneOptions) => {
  const data = interneOptions.find((o) =>
    o.id === idKontakt
  )
  if (!data) return 'Kontakt entfernen'
  return `${data.kurzzeichen} entfernen`
}

const verantwortlichData = (gkI, interneOptions) => {
  const data = interneOptions.find((o) =>
    o.id === gkI.idKontakt
  )
  if (!data) return ''
  const name = `${data.vorname} ${data.name}`
  const abt = data.abteilung ? `, ${data.abteilung}` : ''
  const eMail = data.eMail ? `, ${data.eMail}` : ''
  const telefon = data.telefon ? `, ${data.telefon}` : ''
  return `${name}${abt}${eMail}${telefon}`
}

const optionsList = (
  interneOptions,
  geschaefteKontakteIntern,
  activeId
) => {
  // filter out options already choosen
  const kontakteInternOfActiveGeschaeft = geschaefteKontakteIntern.filter((g) =>
    g.idGeschaeft === activeId
  )
  const idKontakteOfGkiOfActiveGeschaeft = kontakteInternOfActiveGeschaeft.map((kI) =>
    kI.idKontakt
  )
  const interneOptionsFiltered = interneOptions.filter((o) =>
    !idKontakteOfGkiOfActiveGeschaeft.includes(o.id)
  )
  // sort interneOptions by kurzzeichen
  const interneOptionsSorted = _.sortBy(interneOptionsFiltered, (o) =>
    o.kurzzeichen.toLowerCase()
  )
  const options = interneOptionsSorted.map((o, index) => {
    let times = 5 - o.kurzzeichen.length
    // make sure, times is never < 0
    if (times < 0) times = 0
    const space = '\xa0'.repeat(times)
    const name = `${o.vorname || ''} ${o.name || ''}`
    return (
      <option
        key={index + 1}
        value={o.id}
      >
        {`${o.kurzzeichen}${space}${'\xa0\xa0\xa0'}${name}`}
      </option>
    )
  })
  options.unshift(
    <option
      key={0}
      value=""
    >
    </option>
  )
  return options
}

class GeschaefteKontakteIntern extends Component {
  static propTypes = {
    interneOptions: PropTypes.array.isRequired,
    geschaefteKontakteIntern: PropTypes.array.isRequired,
    activeIdGeschaeft: PropTypes.number,
    activeIdKontakt: PropTypes.number,
    geschaeftKontaktInternNewCreate: PropTypes.func.isRequired,
    geschaeftKontaktInternRemove: PropTypes.func.isRequired,
    activeId: PropTypes.number.isRequired,
    tabIndex: PropTypes.number.isRequired
  }

  renderItems() {
    const {
      geschaefteKontakteIntern,
      activeId,
      interneOptions,
      geschaeftKontaktInternRemove
    } = this.props
    // filter for this geschaeft
    const gkIFiltered = geschaefteKontakteIntern.filter((g) =>
      g.idGeschaeft === activeId
    )
    const gkISorted = _.sortBy(gkIFiltered, (g) => {
      const intOption = interneOptions.find((o) =>
        o.id === g.idKontakt
      )
      return intOption.kurzzeichen.toLowerCase()
    })
    return gkISorted.map((gkI, index) => {
      const intOption = interneOptions.find((o) =>
        o.id === gkI.idKontakt
      )
      const kurzzeichen = intOption.kurzzeichen
      return (
        <div
          key={index + 1}
          className={styles.row}
        >
          <div className={styles.fV}>
            {kurzzeichen}
          </div>
          <div className={styles.fVN}>
              {verantwortlichData(gkI, interneOptions)}
          </div>
          <div className={styles.deleteGlyphiconDiv}>
            <Glyphicon
              glyph="remove-circle"
              onClick={() => geschaeftKontaktInternRemove(activeId, gkI.idKontakt)}
              className={styles.removeGlyphicon}
              title={titleText(gkI.idKontakt, interneOptions)}
            />
          </div>
        </div>
      )
    })
  }

  render = () => {
    const {
      tabIndex,
      geschaeftKontaktInternNewCreate,
      activeId,
      interneOptions,
      geschaefteKontakteIntern
    } = this.props
    return (
      <div className={styles.body}>
        {this.renderItems()}
        <div
          key={0}
          className={styles.rowfVDropdown}
        >
          <div className={styles.fVDropdown}>
            <FormControl
              componentClass="select"
              bsSize="small"
              className={styles.dropdown}
              onChange={(e) =>
                onChangeNewKontaktIntern(e, geschaeftKontaktInternNewCreate, activeId)
              }
              title="Neuen Kontakt hinzufügen"
              tabIndex={tabIndex}
            >
              {
                optionsList(
                  interneOptions,
                  geschaefteKontakteIntern,
                  activeId
                )
              }
            </FormControl>
          </div>
        </div>
      </div>
    )
  }
}

export default GeschaefteKontakteIntern
