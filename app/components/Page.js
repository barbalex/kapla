'use strict'

/*
 * This component builds and displays a single page
 */

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Input } from 'react-bootstrap'
import moment from 'moment'
import styles from './Page.css'

class Page extends Component {
  static propTypes = {
    pages: PropTypes.array,
    geschaefte: PropTypes.array,
    full: PropTypes.bool,
    remainingGeschaefte: PropTypes.array,
    activePageIndex: PropTypes.number,
    pageIndex: PropTypes.number.isRequired,
    pageAddGeschaeft: PropTypes.func.isRequired,
    pagesMoveGeschaeftToNewPage: PropTypes.func.isRequired,
    pagesQueryTitle: PropTypes.func.isRequired,
    pagesSetTitle: PropTypes.func.isRequired,
    title: PropTypes.string,
    queryTitle: PropTypes.bool
  }

  componentDidMount = () => {
    this.nextStepp()
  }

  componentDidUpdate = () => {
    this.nextStepp()
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
    const {
      geschaefte,
      full,
      remainingGeschaefte,
      pageAddGeschaeft,
      pagesMoveGeschaeftToNewPage
    } = this.props
    const parentHeight = ReactDOM.findDOMNode(this).parentNode.offsetHeight
    const pageHeight = ReactDOM.findDOMNode(this).parentNode.scrollHeight

    if (!full && remainingGeschaefte.length > 0) {
      if (parentHeight < pageHeight) {
        const lastGeschaeft = geschaefte[geschaefte.length - 1]
        pagesMoveGeschaeftToNewPage(lastGeschaeft)
      } else {
        pageAddGeschaeft()
      }
    }
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
        className={styles.titleInput}
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

  footer = () => {
    const { pageIndex, pages } = this.props
    const now = moment().format('DD.MM.YYYY')
    return (
      <div className={styles.footer}>
        <p>{now}</p>
        <p>Seite {pageIndex + 1}/{pages.length}</p>
      </div>
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
    const { pageIndex, queryTitle } = this.props
    const showPagesTitle = pageIndex === 0
    return (
      <div>
        {showPagesTitle && queryTitle && this.inputPagesTitle()}
        {showPagesTitle && !queryTitle && this.textPagesTitle()}
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
          {this.footer()}
        </div>
      </div>
    )
  }
}

export default Page
