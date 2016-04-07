'use strict'

/*
 * This component display a page
 */

import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import ReactList from 'react-list'
import styles from './Pages.css'
import Navbar from '../containers/Navbar.js'

class Page extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    activePageIndex: PropTypes.number.isRequired,
    pageAddGeschaeft: PropTypes.func.isRequired,
    pageRemoveGeschaeft: PropTypes.func.isRequired,
    pagesNewPage: PropTypes.func.isRequired
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

  renderItem(index, key) {
    const { geschaefte } = this.props
    const geschaeft = geschaefte[index]
    const fristMitarbeiter = geschaeft.fristMitarbeiter ? `Frist: ${geschaeft.fristMitarbeiter}` : null

    return (
      <Row
        key={key}
        className={styles.row}
      >
        <Col xs={1} sm={1} md={1} lg={1}>
          <div>
            {geschaeft.idGeschaeft}
          </div>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8}>
          <div className={styles.fieldGegenstand}>
            {geschaeft.gegenstand}
          </div>
          <div>
            {geschaeft.details}
          </div>
        </Col>
        <Col xs={2} sm={2} md={2} lg={2}>
          <div>
            {geschaeft.status}
          </div>
          <div>
            {fristMitarbeiter}
          </div>
          <div>
            {geschaeft.faelligkeitText}
          </div>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1}>
          <div>
            {geschaeft.idKontaktIntern}
          </div>
          <div>
            {geschaeft.kontaktInternVornameName}
          </div>
        </Col>
      </Row>
    )
  }

  renderItems(items, ref) {
    return (
      <Grid ref={ref}>
        {items}
      </Grid>
    )
  }

  render() {
    const { geschaefte } = this.props
    return (
      <div className = {styles.body}>
        <Navbar />
        <div className={[styles.grid, 'reactList'].join(' ')}>
          <ReactList
            itemRenderer={::this.renderItem}
            length={geschaefte.length}
            type="variable"
          />
        </div>
      </div>
    )
  }
}

export default Page
