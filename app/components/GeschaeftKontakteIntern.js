'use strict'

import React, { Component, PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'
import styles from './GeschaeftKontakteIntern.css'
import GeschaeftKontakteInternItems from '../containers/GeschaeftKontakteInternItems'

const onChangeNewKontaktIntern = (e, geschaeftKontaktInternNewCreate, activeId) => {
  const idKontakt = e.target.value
  geschaeftKontaktInternNewCreate(activeId, idKontakt)
  // need to empty dropdown
  e.target.value = ''
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

const GeschaefteKontakteIntern = ({
  tabIndex,
  geschaeftKontaktInternNewCreate,
  activeId,
  interneOptions,
  geschaefteKontakteIntern
}) =>
  <div className={styles.body}>
    <GeschaeftKontakteInternItems />
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

GeschaefteKontakteIntern.displayName = 'GeschaefteKontakteIntern'

GeschaefteKontakteIntern.propTypes = {
  interneOptions: PropTypes.array.isRequired,
  geschaefteKontakteIntern: PropTypes.array.isRequired,
  activeIdGeschaeft: PropTypes.number,
  activeIdKontakt: PropTypes.number,
  geschaeftKontaktInternNewCreate: PropTypes.func.isRequired,
  geschaeftKontaktInternRemove: PropTypes.func.isRequired,
  activeId: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired
}

export default GeschaefteKontakteIntern
