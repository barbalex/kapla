'use strict'

import React, { Component, PropTypes } from 'react'
import Page from '../containers/Page.js'
import styles from './Pages.css'


class Pages extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired,
    building: PropTypes.bool.isRequired
  }

  pages = () => {
    const { pages, building } = this.props
    const pageContainerStyle = building ? [styles.pageContainer, styles.pageContainerOverflow].join(' ') : styles.pageContainer
    return pages.map((page, pageIndex) => (
      <div key={pageIndex} className={pageContainerStyle}>
        <Page pageIndex={pageIndex} />
      </div>
    ))
  }

  render = () => (
    <div className = {styles.body}>
      {this.pages()}
    </div>
  )
}

export default Pages
