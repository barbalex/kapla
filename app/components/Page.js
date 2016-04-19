'use strict'

/*
 * This component builds and displays a single page
 */

import React, { Component, PropTypes } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
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
    pagesFinishedBuilding: PropTypes.func.isRequired,
    title: PropTypes.string,
    queryTitle: PropTypes.bool,
    messageShow: PropTypes.func.isRequired,
    building: PropTypes.bool.isRequired
  }

  componentDidMount = () => {
    const { messageShow } = this.props
    messageShow(true, 'Der Bericht wird aufgebaut...')
    // wait with next stepp until message is shown
    setTimeout(() => {
      this.nextStepp()
    }, 100)
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
      activePageIndex,
      pageIndex,
      geschaefte,
      full,
      remainingGeschaefte,
      pageAddGeschaeft,
      pagesMoveGeschaeftToNewPage,
      pagesFinishedBuilding,
      messageShow
    } = this.props
    // const offsetHeight = ReactDOM.findDOMNode(this).offsetHeight
    const offsetHeight = this.refs[`rowsContainer${pageIndex}`].offsetHeight
    // const scrollHeight = ReactDOM.findDOMNode(this).scrollHeight
    const scrollHeight = this.refs[`rowsContainer${pageIndex}`].scrollHeight

    if (!full && remainingGeschaefte.length > 0) {
      if (offsetHeight < scrollHeight) {
        const lastGeschaeft = geschaefte[geschaefte.length - 1]
        pagesMoveGeschaeftToNewPage(lastGeschaeft)
      } else {
        pageAddGeschaeft()
      }
    }
    if (remainingGeschaefte.length === 0 && pageIndex === activePageIndex) {
      messageShow(false, null)
      pagesFinishedBuilding()
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
      <FormGroup>
        <FormControl
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
      </FormGroup>
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
    const { pageIndex, queryTitle, building } = this.props
    const showPagesTitle = pageIndex === 0
    const pageContainerStyle = building ? [styles.pageContainer, styles.pageContainerOverflow].join(' ') : styles.pageContainer

    return (
      <div className={pageContainerStyle}>
        <div className={styles.rowsContainer} ref={`rowsContainer${pageIndex}`}>
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
          {this.tableRows()}
        </div>
        {this.footer()}
      </div>
    )
  }
}

export default Page
