'use strict'

/*
 * This component builds and displays a single page
 */

import React, { Component, PropTypes } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import moment from 'moment'
import styles from './Page.css'
import PageFristenHeader from './PageFristenHeader'
import PageFristenRows from './PageFristenRows'
import PageList1Header from './PageList1Header'
import PageList1Rows from './PageList1Rows'

class Page extends Component {
  static propTypes = {
    pages: PropTypes.array,
    geschaefte: PropTypes.array,
    remainingGeschaefte: PropTypes.array,
    geschaefteGefilterteIds: PropTypes.array,
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
    building: PropTypes.bool.isRequired,
    reportType: PropTypes.string
  }

  componentDidMount = () => {
    this.showMessage()
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

  showMessage = () => {
    const {
      messageShow,
      pages,
      geschaefteGefilterteIds,
      remainingGeschaefte
    } = this.props
    const msgLine2Txt = `Bisher ${pages.length} Seiten, ${remainingGeschaefte.length} Geschäfte noch zu verarbeiten`
    const msgLine2 = geschaefteGefilterteIds.length > 50 ? msgLine2Txt : ''
    messageShow(true, 'Der Bericht wird aufgebaut...', msgLine2)
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
      pages,
      activePageIndex,
      pageIndex,
      geschaefte,
      remainingGeschaefte,
      pageAddGeschaeft,
      pagesMoveGeschaeftToNewPage,
      pagesFinishedBuilding,
      messageShow
    } = this.props

    // don't do anything on not active pages
    if (pageIndex === activePageIndex) {
      const offsetHeight = this.refs[`rowsContainer${pageIndex}`].offsetHeight
      const scrollHeight = this.refs[`rowsContainer${pageIndex}`].scrollHeight
      const activePageIsFull = pages[pageIndex].full

      if (!activePageIsFull && remainingGeschaefte.length > 0) {
        if (offsetHeight < scrollHeight) {
          const lastGeschaeft = geschaefte[geschaefte.length - 1]
          pagesMoveGeschaeftToNewPage(lastGeschaeft)
          this.showMessage()
        } else {
          pageAddGeschaeft()
        }
      }
      if (remainingGeschaefte.length === 0) {
        messageShow(false, '', '')
        pagesFinishedBuilding()
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
      <h1
        onClick={this.onClickH1}
        className={styles.h1}
      >
        {title}
      </h1>
    )
  }

  footer = () => {
    const { pageIndex, pages } = this.props
    const now = moment().format('DD.MM.YYYY')
    return (
      <div className={styles.footer}>
        <p>
          {now}
        </p>
        <p>
          Seite {pageIndex + 1}/{pages.length}
        </p>
      </div>
    )
  }

  tableRows = () => {
    const { geschaefte, reportType } = this.props
    return geschaefte.map((geschaeft, index) => {
      if (reportType === 'Fristen') {
        return (
          <PageFristenRows
            geschaeft={geschaeft}
            key={index}
            rowIndex={index}
          />
        )
      }
      if (reportType === 'List1') {
        return (
          <PageList1Rows
            geschaeft={geschaeft}
            key={index}
            rowIndex={index}
          />
        )
      }
      return null
    })
  }

  render = () => {
    const {
      pageIndex,
      queryTitle,
      building,
      reportType
    } = this.props
    const showPagesTitle = pageIndex === 0
    const pageContainerStyle = (
      building ?
      [styles.pageContainer, styles.pageContainerOverflow].join(' ') :
      styles.pageContainer
    )

    return (
      <div className={pageContainerStyle}>
        <div
          className={styles.rowsContainer}
          ref={`rowsContainer${pageIndex}`}
        >
          {
            showPagesTitle &&
            queryTitle &&
            this.inputPagesTitle()
          }
          {
            showPagesTitle &&
            !queryTitle &&
            this.textPagesTitle()
          }
          {
            reportType === 'Fristen' &&
            <PageFristenHeader />
          }
          {
            reportType === 'List1' &&
            <PageList1Header />
          }
          {this.tableRows()}
        </div>
        {this.footer()}
      </div>
    )
  }
}

export default Page
