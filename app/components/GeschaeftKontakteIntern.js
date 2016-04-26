'use strict'

import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import styles from './GeschaefteKontakteIntern.css'

class GeschaefteKontakteIntern extends Component {
  static propTypes = {
    geschaefteKontakteIntern: PropTypes.array.isRequired,
    activeIdGeschaeft: PropTypes.number,
    activeIdKontakt: PropTypes.number,
    geschaeftKontaktInternToggleActivated: PropTypes.func.isRequired
  }

  onClickGeschaeft(idGeschaeft) {
    const { geschaeftKontaktInternToggleActivated } = this.props
    geschaeftKontaktInternToggleActivated(idGeschaeft)
  }

  dauerBisFristMitarbeiter = (geschaeft) => {
    if (!geschaeft.fristMitarbeiter) return null
    const now = moment()
    const end = moment(geschaeft.fristMitarbeiter, 'DD.MM.YYYY')
    const duration = moment.duration(end.diff(now))
    const days = duration.asDays()
    return days ? Math.ceil(days) : ''
  }

  statusFristInText = (dauerBisFristMitarbeiter) => {
    if (dauerBisFristMitarbeiter < 0) return 'Überfällig'
    if (dauerBisFristMitarbeiter === 0) return 'Heute'
    if (dauerBisFristMitarbeiter === 1) return `In ${dauerBisFristMitarbeiter} Tag`
    return `In ${dauerBisFristMitarbeiter} Tagen`
  }

  statusFristInStyle = (statusFristInText) => {
    if (statusFristInText === 'Überfällig') return styles.fieldFristInUeberfaellig
    if (statusFristInText === 'Heute') return styles.fieldFristInHeute
    return null
  }

  renderItem(index, key) {
    const { geschaefteKontakteIntern, geschaefteGefilterteIds, activeId } = this.props
    const isActive = activeId && activeId === geschaefteGefilterteIds[index]
    const trClassName = isActive ? [styles.tableBodyRow, styles.active].join(' ') : styles.tableBodyRow
    const geschaeft = geschaefteKontakteIntern.find((g) => g.idGeschaeft === geschaefteGefilterteIds[index])
    const fristMitarbeiter = geschaeft.fristMitarbeiter ? `Frist: ${geschaeft.fristMitarbeiter}` : ''
    const dauerBisFristMitarbeiter = this.dauerBisFristMitarbeiter(geschaeft)
    const statusFristInText = this.statusFristInText(dauerBisFristMitarbeiter)
    const statusFristIn = geschaeft.fristMitarbeiter ? statusFristInText : null

    return (
      <div
        key={key}
        className={trClassName}
        onClick={this.onClickGeschaeft.bind(this, geschaeft.idGeschaeft)}
      >
        <div className={styles.columnIdGeschaeft}>
          <div>
            {geschaeft.idGeschaeft}
          </div>
        </div>
        <div className={styles.columnGegenstand}>
          <div className={styles.fieldGegenstand}>
            {geschaeft.gegenstand}
          </div>
          <div>
            {geschaeft.details}
          </div>
        </div>
        <div className={styles.columnStatus}>
          <div>
            {geschaeft.status}
          </div>
          <div>
            {fristMitarbeiter}
          </div>
          <div className={this.statusFristInStyle(statusFristInText)}>
            {statusFristIn}
          </div>
        </div>
        <div className={styles.columnKontaktIntern}>
          <div>
            {geschaeft.verantwortlich}
          </div>
          <div>
            {geschaeft.verantwortlichVornameName}
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

export default GeschaefteKontakteIntern
