'use strict'

import React, { Component, PropTypes } from 'react'
import Page from '../containers/Page.js'
import styles from './Pages.css'

class Pages extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired
  }

  pages = () => {
    // TODO
    const { pages } = this.props
    return pages.map((page, pageIndex) => <Page key={pageIndex} pageIndex={pageIndex} />)
  }

  render = () => {
    return (
      <div className = {styles.body}>
        <div className={styles.pagesList}>
          {this.pages()}
        </div>
      </div>
    )
  }
}

export default Pages
