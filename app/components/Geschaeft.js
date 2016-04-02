import React, { Component, PropTypes } from 'react'
import { Input, Grid, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import styles from './Geschaeft.css'
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
            <Col xs={6} sm={6} md={6} lg={6} className={styles.bereichTitel}>Geschäft</Col>
            <Col xs={6} sm={6} md={6} lg={6} className={styles.bereichTitel}>Nummern</Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input
                type = 'textarea'
                label = 'Gegenstand'
                value = {geschaeft.gegenstand}
                bsSize = 'small'
                className = {[styles.geschaeft, styles.gegenstand].join(' ')}
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
                className={[styles.nr, styles.idGeschaeft].join(' ')}
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
                className={styles.geschaeft}
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
                className={styles.nr}
              />
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'Jahr'
                value = {geschaeft.entscheidAwelJahr}
                bsSize = 'small'
                className={styles.nr}
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
                className={styles.geschaeft}
              />
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'BDV&nbsp;&nbsp;&nbsp;&nbsp;Nr.'
                value = {geschaeft.entscheidBdvNr}
                bsSize = 'small'
                className={styles.nr}
              />
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'Jahr'
                value = {geschaeft.entscheidBdvJahr}
                bsSize = 'small'
                className={styles.nr}
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
                className={styles.geschaeft}
              />
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'KR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nr.'
                value = {geschaeft.entscheidKrNr}
                bsSize = 'small'
                className={styles.nr}
              />
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'Jahr'
                value = {geschaeft.entscheidKrJahr}
                bsSize = 'small'
                className={styles.nr}
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
                className={styles.geschaeft}
              />
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'RRB&nbsp;&nbsp;&nbsp;&nbsp;Nr.'
                value = {geschaeft.entscheidRrbNr}
                bsSize = 'small'
                className={styles.nr}
              />
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'number'
                label = 'Jahr'
                value = {geschaeft.entscheidRrbJahr}
                bsSize = 'small'
                className={styles.nr}
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
                className = {styles.geschaeft}
              />
            </Col>
            <Col xs={3} sm={3} md={3} lg={3} className={[styles.bereichTitel, styles.bereichTitelParlVorst].join(' ')}>
              <p className={styles.bereichTitelParlVorstP}>Parlamentarische Vorstösse</p>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2}>
              <Input
                type = 'text'
                label = 'Aktenstandort'
                value = {geschaeft.aktenstandort}
                bsSize = 'small'
                className={styles.nr}
              />
            </Col>
            <Col xs={1} sm={1} md={1} lg={1}>
              <Input
                type = 'text'
                label = 'Nr.'
                value = {geschaeft.aktennummer}
                bsSize = 'small'
                className={styles.nr}
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
                className={styles.geschaeft}
              />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input
                type = 'text'
                label = 'Typ'
                value = {geschaeft.parlVorstossTyp}
                bsSize = 'small'
                className={styles.parlVorstoss}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input
                type = 'textarea'
                label = 'Nächster Schritt'
                value = {geschaeft.naechsterSchritt}
                bsSize = 'small'
                className={styles.geschaeft}
              />
            </Col>
            <Col xs={2} sm={2} md={2} lg={2}>
              <Input
                label='Stufe'
              >
                <div>
                  <label className='radio-inline'>
                    <input
                      type='radio'
                      value='1'
                      name='radio_option'
                    /> 1
                  </label>
                  <label className='radio-inline'>
                    <input
                      type='radio'
                      value='2'
                      name='radio_option'
                    /> 2
                  </label>
                </div>
              </Input>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <Input
                label='Zuständigkeit'
              >
                <div>
                  <label className='radio-inline'>
                    <input
                      type='radio'
                      value='hauptzuständig'
                      name='radio_option'
                    />hauptzuständig
                  </label>
                  <label className='radio-inline'>
                    <input
                      type='radio'
                      value='mitberichtzuständig'
                      name='radio_option'
                    />mitberichtzuständig
                  </label>
                </div>
              </Input>
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input
                type = 'textarea'
                label = 'Vermerk'
                value = {geschaeft.vermerk}
                bsSize = 'small'
                className={styles.geschaeft}
              />
            </Col>
            <Col xs={2} sm={2} md={2} lg={2}>
              <Input
                label='Ebene'
              >
                <div>
                  <label className='radio-inline'>
                    <input
                      type='radio'
                      value='Kanton'
                      name='radio_option'
                    />Kanton
                  </label>
                  <label className='radio-inline'>
                    <input
                      type='radio'
                      value='Bund'
                      name='radio_option'
                    />Bund
                  </label>
                </div>
              </Input>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <Input
                label='Erlassform'
              >
                <div>
                  <label className='radio-inline'>
                    <input
                      type='radio'
                      value='Gesetz'
                      name='radio_option'
                    />Gesetz
                  </label>
                  <label className='radio-inline'>
                    <input
                      type='radio'
                      value='Verordnung'
                      name='radio_option'
                    />Verordnung
                  </label>
                </div>
              </Input>
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
