'use strict'

import React, { Component, PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'
import _ from 'lodash'
import styles from './GeschaeftKontakteExtern.css'
import GeschaeftKontakteExternItems from '../containers/GeschaeftKontakteExternItems'

class GeschaefteKontakteExtern extends Component {
  static propTypes = {
    externeOptions: PropTypes.array.isRequired,
    geschaefteKontakteExtern: PropTypes.array.isRequired,
    geschaeftKontaktExternNewCreate: PropTypes.func.isRequired,
    activeId: PropTypes.number.isRequired,
    tabIndex: PropTypes.number.isRequired
  }

  onChangeNewKontaktExtern = (e) => {
    const { geschaeftKontaktExternNewCreate, activeId } = this.props
    const idKontakt = e.target.value
    geschaeftKontaktExternNewCreate(activeId, idKontakt)
    // need to empty dropdown
    e.target.value = ''
  }

  options = () => {
    const {
      externeOptions,
      geschaefteKontakteExtern,
      activeId
    } = this.props
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

  render = () => {
    const { geschaefteKontakteExtern, tabIndex } = this.props
    return (
      <div className={styles.body}>
        <GeschaeftKontakteExternItems />
        <div
          key={0}
          className={styles.rowfVDropdown}
        >
          <div className={styles.fVDropdown}>
            <FormControl
              componentClass="select"
              bsSize="small"
              onChange={this.onChangeNewKontaktExtern}
              title="Neuen Kontakt hinzufügen"
              tabIndex={tabIndex}
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
