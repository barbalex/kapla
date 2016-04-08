'use strict'

import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import ReactList from 'react-list'
import ModalGeschaeftDelete from '../containers/ModalGeschaeftDelete.js'
import styles from './Geschaefte.css'

class Geschaefte extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    geschaefteGefiltert: PropTypes.array.isRequired,
    fetchUsername: PropTypes.func.isRequired,
    username: PropTypes.string,
    holeDbAusConfig: PropTypes.func.isRequired,
    holenGeschaefte: PropTypes.func.isRequired,
    aktiviereGeschaeft: PropTypes.func.isRequired,
    willDeleteGeschaeft: PropTypes.bool,
    activeId: PropTypes.number,
    holenRechtsmittelerledigungOptions: PropTypes.func.isRequired,
    holenParlVorstossTypOptions: PropTypes.func.isRequired,
    holenStatusOptions: PropTypes.func.isRequired,
    holenGeschaeftsartOptions: PropTypes.func.isRequired
  }

  componentWillMount() {
    const {
      fetchUsername,
      holeDbAusConfig,
      holenGeschaefte,
      holenRechtsmittelerledigungOptions,
      holenParlVorstossTypOptions,
      holenStatusOptions,
      holenGeschaeftsartOptions
    } = this.props

    fetchUsername()
    holeDbAusConfig()
    holenGeschaefte()
    holenRechtsmittelerledigungOptions()
    holenParlVorstossTypOptions()
    holenStatusOptions()
    holenGeschaeftsartOptions()
  }

  onClickGeschaeft(idGeschaeft) {
    const { aktiviereGeschaeft } = this.props
    aktiviereGeschaeft(idGeschaeft)
  }

  renderItem(index, key) {
    const { geschaefteGefiltert, activeId } = this.props
    const isActive = activeId && activeId === geschaefteGefiltert[index].idGeschaeft
    const className = isActive ? [styles.row, styles.active].join(' ') : styles.row
    const geschaeft = geschaefteGefiltert[index]
    const fristMitarbeiter = geschaeft.fristMitarbeiter ? `Frist: ${geschaeft.fristMitarbeiter}` : null

    return (
      <Row
        key={key}
        className={className}
        onClick={this.onClickGeschaeft.bind(this, geschaeft.idGeschaeft)}
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
    const { geschaefteGefiltert, willDeleteGeschaeft } = this.props
    return (
      <div className = {styles.body}>
        {willDeleteGeschaeft && <ModalGeschaeftDelete />}
        <div className={[styles.grid, 'reactList'].join(' ')}>
          <ReactList
            itemRenderer={::this.renderItem}
            length={geschaefteGefiltert.length}
            type="variable"
          />
        </div>
      </div>
    )
  }
}

export default Geschaefte
