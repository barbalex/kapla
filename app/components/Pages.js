'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Input } from 'react-bootstrap'
import Page from '../containers/Page.js'
import styles from './Pages.css'

class Pages extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    queryTitle: PropTypes.bool,
    reportType: PropTypes.string,
    activePageIndex: PropTypes.number.isRequired,
    remainingGeschaefte: PropTypes.array.isRequired,
    pagesQueryTitle: PropTypes.func.isRequired,
    pagesSetTitle: PropTypes.func.isRequired
  }

  componentDidUpdate = () => {
    /**
     * - measure height of pageSize-component
     * - if > desired page height:
     *  - move last row to next page
     *  - render
     * - else:
     *  - insert next row
     *  - render
     */
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

  pages = () => {
    // TODO
    const { pages } = this.props
    return pages.map((page, index) => <Page key={index} index={index} />)
  }

  textPagesTitle = () => {
    const { title } = this.props
    return (
      <h1 onClick={this.onClickH1} className={styles.h1}>
        {title}
      </h1>
    )
  }

  render = () => {
    const { queryTitle, activePageIndex } = this.props

    return (
      <div className = {styles.body}>
        {queryTitle && this.inputPagesTitle()}
        {!queryTitle && this.textPagesTitle()}
        <div className={styles.pagesList}>
          {this.pages()}
        </div>
        <p>Seite {activePageIndex}</p>
      </div>
    )
  }
}

export default Pages
