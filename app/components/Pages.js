'use strict'

import React, { Component, PropTypes } from 'react'
import styles from './Pages.css'
import ModalPagesTitle from '../containers/ModalPagesTitle.js'

class Pages extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    queryTitle: PropTypes.bool,
    reportType: PropTypes.string,
    activePageIndex: PropTypes.number.isRequired,
    remainingGeschaefte: PropTypes.array.isRequired
  }

  componentDidUpdate() {
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

  pages = () => {
    // TODO
    const { remainingGeschaefte } = this.props
  }

  render() {
    const { title, queryTitle, activePageIndex } = this.props

    return (
      <div className = {styles.body}>
        {queryTitle && <ModalPagesTitle />}
        <h1>{title}</h1>
        <div className={styles.pagesList}>
          {this.pages()}
        </div>
        <p>Seite {activePageIndex}</p>
      </div>
    )
  }
}

export default Pages
