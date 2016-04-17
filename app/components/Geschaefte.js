'use strict'

import React, { Component, PropTypes } from 'react'
import ReactList from 'react-list'
import styles from './Geschaefte.css'

class Geschaefte extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    geschaefteGefilterteIds: PropTypes.array.isRequired,
    fetchUsername: PropTypes.func.isRequired,
    username: PropTypes.string,
    dbGetFromConfig: PropTypes.func.isRequired,
    getGeschaefte: PropTypes.func.isRequired,
    aktiviereGeschaeft: PropTypes.func.isRequired,
    activeId: PropTypes.number,
    holenRechtsmittelerledigungOptions: PropTypes.func.isRequired,
    holenParlVorstossTypOptions: PropTypes.func.isRequired,
    holenStatusOptions: PropTypes.func.isRequired,
    holenGeschaeftsartOptions: PropTypes.func.isRequired
  }

  componentWillMount() {
    const {
      fetchUsername,
      dbGetFromConfig,
      getGeschaefte,
      holenRechtsmittelerledigungOptions,
      holenParlVorstossTypOptions,
      holenStatusOptions,
      holenGeschaeftsartOptions
    } = this.props

    fetchUsername()
    dbGetFromConfig()
    getGeschaefte()
    holenRechtsmittelerledigungOptions()
    holenParlVorstossTypOptions()
    holenStatusOptions()
    holenGeschaeftsartOptions()
  }

  onClickGeschaeft(idGeschaeft) {
    const { aktiviereGeschaeft } = this.props
    aktiviereGeschaeft(idGeschaeft)
  }

  renderItem(index, key) {
    const { geschaefte, geschaefteGefilterteIds, activeId } = this.props
    const isActive = activeId && activeId === geschaefteGefilterteIds[index]
    const trClassName = isActive ? [styles.tableBodyRow, styles.active].join(' ') : styles.tableBodyRow
    const geschaeft = geschaefte.find((g) => g.idGeschaeft === geschaefteGefilterteIds[index])
    const fristMitarbeiter = geschaeft.fristMitarbeiter ? `Frist: ${geschaeft.fristMitarbeiter}` : null

    return (
      <div
        key={key}
        className={trClassName}
        onClick={this.onClickGeschaeft.bind(this, geschaeft.idGeschaeft)}
      >
        <div className={[styles.columnIdGeschaeft, styles.tableBodyCell].join(' ')}>
          <div>
            {geschaeft.idGeschaeft}
          </div>
        </div>
        <div className={[styles.columnGegenstand, styles.tableBodyCell].join(' ')}>
          <div className={styles.fieldGegenstand}>
            {geschaeft.gegenstand}
          </div>
          <div>
            {geschaeft.details}
          </div>
        </div>
        <div className={[styles.columnStatus, styles.tableBodyCell].join(' ')}>
          <div>
            {geschaeft.status}
          </div>
          <div>
            {fristMitarbeiter}
          </div>
          <div>
            {geschaeft.faelligkeitText}
          </div>
        </div>
        <div className={[styles.columnKontaktIntern, styles.tableBodyCell].join(' ')}>
          <div>
            {geschaeft.idKontaktIntern}
          </div>
          <div>
            {geschaeft.kontaktInternVornameName}
          </div>
        </div>
      </div>
    )
  }

  renderItems(items, ref) {
    return (
      <div ref={ref} className={styles.table}>
        {items}
      </div>
    )
  }

  render() {
    /**
     * class 'reactList' is needed to
     * apply ::-webkit-scrollbar: display: none;
     */
    const { geschaefteGefilterteIds } = this.props

    return (
      <div className={styles.body}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderRow}>
              <div className={[styles.columnIdGeschaeft, styles.tableHeaderCell].join(' ')}>ID</div>
              <div className={[styles.columnGegenstand, styles.tableHeaderCell].join(' ')}>Gegenstand</div>
              <div className={[styles.columnStatus, styles.tableHeaderCell].join(' ')}>Status</div>
              <div className={[styles.columnKontaktIntern, styles.tableHeaderCell].join(' ')}>Kontakt</div>
            </div>
          </div>
          <div className={[styles.tableBody, 'reactList'].join(' ')}>
            <ReactList
              itemRenderer={::this.renderItem}
              length={geschaefteGefilterteIds.length}
              type="variable"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Geschaefte
