'use strict'

import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import ReactList from 'react-list'
import moment from 'moment'
import styles from './Geschaefte.css'

const getDauerBisFristMitarbeiter = (geschaeft) => {
  if (!geschaeft.fristMitarbeiter) return null
  const now = moment()
  const end = moment(geschaeft.fristMitarbeiter, 'DD.MM.YYYY')
  const duration = moment.duration(end.diff(now))
  const days = duration.asDays()
  return days ? Math.ceil(days) : ''
}

const getStatusFristInText = (dauerBisFristMitarbeiter) => {
  if (dauerBisFristMitarbeiter < 0) return 'Überfällig'
  if (dauerBisFristMitarbeiter === 0) return 'Heute'
  if (dauerBisFristMitarbeiter === 1) return `In ${dauerBisFristMitarbeiter} Tag`
  return `In ${dauerBisFristMitarbeiter} Tagen`
}

const getStatusFristInStyle = (statusFristInText) => {
  if (statusFristInText === 'Überfällig') return styles.fieldFristInUeberfaellig
  if (statusFristInText === 'Heute') return styles.fieldFristInHeute
  return null
}

class Geschaefte extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    geschaefteGefilterteIds: PropTypes.array.isRequired,
    username: PropTypes.string,
    geschaeftToggleActivated: PropTypes.func.isRequired,
    activeId: PropTypes.number,
    path: PropTypes.string.isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  renderItem(index, key) {
    const {
      geschaefte,
      geschaefteGefilterteIds,
      activeId,
      path,
      router,
      geschaeftToggleActivated,
    } = this.props
    const isActive = activeId && activeId === geschaefteGefilterteIds[index]
    const trClassName = (
      isActive ?
      [styles.tableBodyRow, styles.active].join(' ') :
      styles.tableBodyRow
    )
    const geschaeft = geschaefte.find((g) =>
      g.idGeschaeft === geschaefteGefilterteIds[index]
    )
    const fristMitarbeiter = (
      geschaeft.fristMitarbeiter ?
      `Frist: ${geschaeft.fristMitarbeiter}` :
      ''
    )
    const dauerBisFristMitarbeiter = getDauerBisFristMitarbeiter(geschaeft)
    const statusFristInText = getStatusFristInText(dauerBisFristMitarbeiter)
    const statusFristIn = geschaeft.fristMitarbeiter ? statusFristInText : null

    return (
      <div
        key={key}
        className={trClassName}
        onClick={() => {
          // if path is not '/geschaefte', make it that
          // because this is also called from '/fieldFilter'
          // TODO: Error router is undefined?????
          if (path !== '/geschaefte') {
            router.push('/geschaefte')
          }
          geschaeftToggleActivated(geschaeft.idGeschaeft)
        }}
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
          {/*
            <div>
              {geschaeft.details}
            </div>
          */}
        </div>
        <div className={styles.columnStatus}>
          <div>
            {geschaeft.status}
          </div>
          <div>
            {fristMitarbeiter}
          </div>
          <div className={getStatusFristInStyle(statusFristInText)}>
            {statusFristIn}
          </div>
        </div>
        <div className={styles.columnKontaktIntern}>
          <div>
            {geschaeft.verantwortlichVornameName}
          </div>
          <div>
            {geschaeft.verantwortlich}
          </div>
        </div>
      </div>
    )
  }

  renderItems(items, ref) {
    return (
      <div
        ref={ref}
        className={styles.table}
      >
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
              <div className={[styles.columnIdGeschaeft, styles.tableHeaderCell].join(' ')}>
                ID
              </div>
              <div className={[styles.columnGegenstand, styles.tableHeaderCell].join(' ')}>
                Gegenstand
              </div>
              <div className={[styles.columnStatus, styles.tableHeaderCell].join(' ')}>
                Status
              </div>
              <div className={[styles.columnKontaktIntern, styles.tableHeaderCell].join(' ')}>
                Verantwortlich
              </div>
            </div>
          </div>
          <div className={styles.tableBody}>
            <ReactList
              itemRenderer={::this.renderItem}
              length={geschaefteGefilterteIds.length}
              type="uniform"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Geschaefte)
