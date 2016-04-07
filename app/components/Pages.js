'use strict'

import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import ReactList from 'react-list'
import styles from './Pages.css'
import Navbar from '../containers/Navbar.js'

class Pages extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    reportType: PropTypes.string.isRequired,
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
    const { title, activePageIndex } = this.props
    return (
      <div className = {styles.body}>
        <Navbar />
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
