'use strict'

/*
 * This component builds and displays a single page
 */

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Input } from 'react-bootstrap'
import styles from './Page.css'

const desiredPageHeight = 800

class Page extends Component {
  static propTypes = {
    geschaefte: PropTypes.array,
    remainingGeschaefte: PropTypes.array,
    activePageIndex: PropTypes.number,
    pageIndex: PropTypes.number.isRequired,
    pageAddGeschaeft: PropTypes.func.isRequired,
    pageRemoveGeschaeft: PropTypes.func.isRequired,
    pagesNewPage: PropTypes.func.isRequired,
    pagesQueryTitle: PropTypes.func.isRequired,
    pagesSetTitle: PropTypes.func.isRequired,
    title: PropTypes.string,
    queryTitle: PropTypes.bool
  }

  componentDidMount = () => {
    const { pageIndex } = this.props
    console.log('components/Page.js, componentDidMount, pageIndex', pageIndex)
    this.nextStepp()
  }

  componentDidUpdate = () => {
    const { pageIndex } = this.props
    console.log('components/Page.js, componentDidUpdate, pageIndex', pageIndex)
    this.nextStepp()
  }

  nextStepp = () => {
    /**
     * - measure height of pageSize-component
     * - if > desired page height:
     *  - move last row to next page
     *  - render
     * - else:
     *  - insert next row
     *  - render
     */
    const { pageIndex, geschaefte, remainingGeschaefte, pageAddGeschaeft, pageRemoveGeschaeft, pagesNewPage } = this.props
    const pageHeight = ReactDOM.findDOMNode(this).offsetHeight

    console.log('components/Page.js, nextStepp, remainingGeschaefte.length', remainingGeschaefte.length)
    console.log('components/Page.js, nextStepp, geschaefte.length', geschaefte.length)
    console.log('components/Page.js, nextStepp, pageHeight', pageHeight)
    console.log('components/Page.js, nextStepp, desiredPageHeight', desiredPageHeight)

    if (pageHeight < desiredPageHeight) {
      pageAddGeschaeft(pageIndex, remainingGeschaefte[0])
    } else if (pageHeight > desiredPageHeight) {
      const lastGeschaeft = geschaefte[geschaefte.length - 1]
      pageRemoveGeschaeft(pageIndex, lastGeschaeft)
      pagesNewPage()
    } else if (pageHeight === desiredPageHeight) {
      pagesNewPage()
      pageAddGeschaeft(pageIndex + 1, remainingGeschaefte[0])
    }
  }

  onClickH1 = () => {
    const { pagesQueryTitle } = this.props
    pagesQueryTitle(true)
  }

  onKeyPressTitle = (e) => {
    const { pagesQueryTitle, title } = this.props
    if (e.key === 'Enter' && title) {
      pagesQueryTitle(false)
    }
  }

  onBlurTitle = () => {
    const { pagesQueryTitle, title } = this.props
    if (title) pagesQueryTitle(false)
  }

  changeQueryTitle = (e) => {
    const { pagesSetTitle } = this.props
    const { value } = e.target
    pagesSetTitle(value)
  }

  inputPagesTitle = () => {
    const { title } = this.props
    return (
      <Input
        type="text"
        value={title}
        placeholder="Titel erfassen"
        onChange={this.changeQueryTitle}
        onKeyPress={this.onKeyPressTitle}
        onBlur={this.onBlurTitle}
        bsSize="large"
        autoFocus
      />
    )
  }

  textPagesTitle = () => {
    const { title } = this.props
    return (
      <h1 onClick={this.onClickH1} className={styles.h1}>
        {title}
      </h1>
    )
  }

  tableRow = (geschaeft) => {
    const fristMitarbeiter = geschaeft.fristMitarbeiter ? `Frist: ${geschaeft.fristMitarbeiter}` : null

    return (
      <div
        key={geschaeft.idGeschaeft}
        className={styles.tableBodyRow}
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

  tableRows = () => {
    const { geschaefte } = this.props
    return geschaefte.map((geschaeft) => this.tableRow(geschaeft))
  }

  render = () => {
    const { pageIndex, activePageIndex, queryTitle } = this.props
    const tbRef = `page${pageIndex}`
    const showPagesTitle = pageIndex === 0
    return (
      <div className={styles.body} ref={tbRef}>
        {showPagesTitle && queryTitle && this.inputPagesTitle()}
        {showPagesTitle && !queryTitle && this.textPagesTitle()}
        {showPagesTitle && <p>Seite {activePageIndex}</p>}
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderRow}>
            <div className={[styles.columnIdGeschaeft, styles.tableHeaderCell].join(' ')}>ID</div>
            <div className={[styles.columnGegenstand, styles.tableHeaderCell].join(' ')}>Gegenstand</div>
            <div className={[styles.columnStatus, styles.tableHeaderCell].join(' ')}>Status</div>
            <div className={[styles.columnKontaktIntern, styles.tableHeaderCell].join(' ')}>Kontakt</div>
          </div>
        </div>
        <div className={styles.tableBody}>
          {this.tableRows()}
        </div>
      </div>
    )
  }
}

export default Page
