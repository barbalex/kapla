'use strict'

/*
 * This component builds and displays a single page
 */

import React, { Component, PropTypes } from 'react'
import ReactList from 'react-list'
import styles from './Pages.css'

class Page extends Component {
  static propTypes = {
    geschaefte: PropTypes.array,
    remainingGeschaefte: PropTypes.array,
    activePageIndex: PropTypes.number,
    index: PropTypes.number.isRequired,
    pageAddGeschaeft: PropTypes.func.isRequired,
    pageRemoveGeschaeft: PropTypes.func.isRequired,
    pagesNewPage: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    const { index } = this.props
    console.log('components/Page.js, componentDidMount, index', index)
  }

  componentDidUpdate = () => {
    const { index } = this.props
    /**
     * - measure height of pageSize-component
     * - if > desired page height:
     *  - move last row to next page
     *  - render
     * - else:
     *  - insert next row
     *  - render
     */
    console.log('components/Page.js, componentDidUpdate, index', index)
  }

  renderItem(index, key) {
    const { geschaefte } = this.props
    const geschaeft = geschaefte[index]
    const fristMitarbeiter = geschaeft.fristMitarbeiter ? `Frist: ${geschaeft.fristMitarbeiter}` : null

    return (
      <div
        key={key}
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
    const { geschaefte, index } = this.props

    console.log('components/Page.js, render, this.props', this.props)
    console.log('components/Page.js, render, index', index)

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
              length={geschaefte.length}
              type="variable"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Page
