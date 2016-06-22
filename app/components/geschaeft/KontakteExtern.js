'use strict'

import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'
import styles from './KontakteExtern.css'
import KontakteExternItems from '../../containers/geschaeft/KontakteExternItems'

const onChangeNewKontaktExtern = (e, geschaeftKontaktExternNewCreate, activeId) => {
  const idKontakt = e.target.value
  geschaeftKontaktExternNewCreate(activeId, idKontakt)
  // need to empty dropdown
  e.target.value = ''
}

const optionsList = (
  externeOptions,
  geschaefteKontakteExtern,
  activeId
) => {
  // filter out options already choosen
  const kontakteInternOfActiveGeschaeft = geschaefteKontakteExtern.filter((g) =>
    g.idGeschaeft === activeId
  )
  const idKontakteOfGkiOfActiveGeschaeft = kontakteInternOfActiveGeschaeft.map((kI) =>
    kI.idKontakt
  )
  const externeOptionsFiltered = externeOptions.filter((o) =>
    !idKontakteOfGkiOfActiveGeschaeft.includes(o.id)
  )
  // sort externeOptions by nameVorname
  const externeOptionsSorted = _.sortBy(externeOptionsFiltered, (o) =>
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

const GeschaefteKontakteExtern = ({
  geschaefteKontakteExtern,
  tabIndex,
  geschaeftKontaktExternNewCreate,
  activeId,
  externeOptions
}) =>
  <div className={styles.body}>
    <KontakteExternItems />
    <div
      key={0}
      className={styles.rowfVDropdown}
    >
      <div className={styles.fVDropdown}>
        <FormControl
          componentClass="select"
          bsSize="small"
          onChange={(e) =>
            onChangeNewKontaktExtern(e, geschaeftKontaktExternNewCreate, activeId)
          }
          title="Neuen Kontakt hinzufügen"
          tabIndex={tabIndex}
        >
          {
            optionsList(
              externeOptions,
              geschaefteKontakteExtern,
              activeId
            )
          }
        </FormControl>
      </div>
    </div>
  </div>

GeschaefteKontakteExtern.displayName = 'GeschaefteKontakteExtern'

GeschaefteKontakteExtern.propTypes = {
  externeOptions: PropTypes.array.isRequired,
  geschaefteKontakteExtern: PropTypes.array.isRequired,
  geschaeftKontaktExternNewCreate: PropTypes.func.isRequired,
  activeId: PropTypes.number.isRequired,
  tabIndex: PropTypes.number.isRequired
}

export default GeschaefteKontakteExtern
