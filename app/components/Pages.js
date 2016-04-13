'use strict'

import React, { Component, PropTypes } from 'react'
import Page from '../containers/Page.js'
import styles from './Pages.css'


class Pages extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired
  }

  pages = () => {
    const { pages } = this.props
    return pages.map((page, pageIndex) => (
      <Page key={pageIndex} pageIndex={pageIndex} />
    ))
  }

  render = () => (
    <div className = {styles.body}>
      {this.pages()}
    </div>
  )
}

export default Pages
