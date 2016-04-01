import React, { Component, PropTypes } from 'react'
import { Input, Grid, Row, Col } from 'react-bootstrap'
import styles from './Counter.css'
import Navbar from '../containers/Navbar.js'

class Geschaeft extends Component {
  static propTypes = {
    holenGeschaeft: PropTypes.func.isRequired,
    geschaeft: PropTypes.object.isRequired
  }

  render() {
    const {
      holenGeschaeft,
      geschaeft
    } = this.props

    return (
      <div>
        <Navbar />
        <Grid fluid>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input
                type = 'text'
                label = 'Gegenstand'
                value = {geschaeft.gegenstand}
                bsSize = 'small'
              />
            </Col>
            <Col xs={5} sm={5} md={5} lg={5}>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'ID Nr.'
                value = {geschaeft.idGeschaeft}
                bsSize = 'small'
                disabled
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input
                type = 'text'
                label = 'Ort'
                value = {geschaeft.ort}
                bsSize = 'small'
              />
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'AWEL Nr.'
                value = {geschaeft.entscheidAwelNr}
                bsSize = 'small'
              />
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'Jahr'
                value = {geschaeft.entscheidAwelJahr}
                bsSize = 'small'
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input
                type = 'text'
                label = 'Geschäftsart'
                value = {geschaeft.geschaeftsart}
                bsSize = 'small'
              />
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'BDV Nr.'
                value = {geschaeft.entscheidBdvNr}
                bsSize = 'small'
              />
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'Jahr'
                value = {geschaeft.entscheidBdvJahr}
                bsSize = 'small'
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input
                type = 'text'
                label = 'Status'
                value = {geschaeft.status}
                bsSize = 'small'
              />
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'KR Nr.'
                value = {geschaeft.entscheidKrNr}
                bsSize = 'small'
              />
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'Jahr'
                value = {geschaeft.entscheidKrJahr}
                bsSize = 'small'
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input
                type = 'text'
                label = 'Direktion'
                value = {geschaeft.zustaendigeDirektion}
                bsSize = 'small'
              />
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'RRB Nr.'
                value = {geschaeft.entscheidRrbNr}
                bsSize = 'small'
              />
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'Jahr'
                value = {geschaeft.entscheidRrbJahr}
                bsSize = 'small'
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input
                type = 'number'
                label = 'ID Vorgeschäft'
                value = {geschaeft.idVorgeschaeft}
                bsSize = 'small'
              />
            </Col>
            <Col xs={3} sm={3} md={3} lg={3}>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2}>
              <Input
                type = 'text'
                label = 'Aktenstandort'
                value = {geschaeft.aktenstandort}
                bsSize = 'small'
              />
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'text'
                label = 'Nr.'
                value = {geschaeft.aktennummer}
                bsSize = 'small'
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input
                type = 'textarea'
                label = 'Details'
                value = {geschaeft.details}
                bsSize = 'small'
              />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input
                type = 'textarea'
                label = 'Nächster Schritt'
                value = {geschaeft.naechsterSchritt}
                bsSize = 'small'
              />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input
                type = 'textarea'
                label = 'Vermerk'
                value = {geschaeft.vermerk}
                bsSize = 'small'
              />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Geschaeft
