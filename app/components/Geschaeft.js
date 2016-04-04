import React, { Component, PropTypes } from 'react'
import { Input, Grid, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import styles from './Geschaeft.css'
import Navbar from '../containers/Navbar.js'

class Geschaeft extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    activeId: PropTypes.number
  }

  render() {
    const {
      geschaefte,
      activeId
    } = this.props

    const geschaeft = geschaefte.find((geschaeft) => geschaeft.idGeschaeft === activeId)

    if (geschaeft && geschaeft.idGeschaeft) {
      return (
        <div>
          <Navbar />
          <Grid fluid>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7} className={styles.bereichTitel}>Geschäft</Col>
              <Col xs={5} sm={5} md={5} lg={5} className={styles.bereichTitel}>Nummern</Col>
            </Row>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = 'textarea'
                  label = 'Gegenstand'
                  value = {geschaeft.gegenstand}
                  bsSize = 'small'
                  className = {[styles.geschaeft, styles.gegenstand].join(' ')}
                />
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = 'number'
                  label = 'ID'
                  value = {geschaeft.idGeschaeft}
                  bsSize = 'small'
                  disabled
                  className={[styles.nr, styles.idGeschaeft].join(' ')}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = 'text'
                  label = 'Ort'
                  value = {geschaeft.ort}
                  bsSize = 'small'
                  className={styles.geschaeft}
                />
              </Col>
              <Col xs={3} sm={3} md={3} lg={3}>
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
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = 'text'
                  label = 'Geschäftsart'
                  value = {geschaeft.geschaeftsart}
                  bsSize = 'small'
                  className={styles.geschaeft}
                />
              </Col>
              <Col xs={3} sm={3} md={3} lg={3}>
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
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = 'text'
                  label = 'Status'
                  value = {geschaeft.status}
                  bsSize = 'small'
                  className={styles.geschaeft}
                />
              </Col>
              <Col xs={3} sm={3} md={3} lg={3}>
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
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = 'text'
                  label = 'Direktion'
                  value = {geschaeft.zustaendigeDirektion}
                  bsSize = 'small'
                  className={styles.geschaeft}
                />
              </Col>
              <Col xs={3} sm={3} md={3} lg={3}>
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
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = 'number'
                  label = 'ID Vorgeschäft'
                  value = {geschaeft.idVorgeschaeft}
                  bsSize = 'small'
                  className = {styles.geschaeft}
                />
              </Col>
              <Col xs={2} sm={2} md={2} lg={2}></Col>
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
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = 'textarea'
                  label = 'Details'
                  value = {geschaeft.details}
                  bsSize = 'small'
                  className={styles.geschaeft}
                />
              </Col>
              <Col xs={5} sm={5} md={5} lg={5} className={[styles.bereichTitel, styles.bereichTitelParlVorst].join(' ')}>
                <p className={styles.bereichTitelParlVorstP}>Parlamentarische Vorstösse</p>
              </Col>
            </Row>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = 'textarea'
                  label = 'Nächster Schritt'
                  value = {geschaeft.naechsterSchritt}
                  bsSize = 'small'
                  className = {styles.geschaeft}
                />
              </Col>
              <Col xs={3} sm={3} md={3} lg={3}>
                <Input
                  type = 'text'
                  label = 'Typ'
                  value = {geschaeft.parlVorstossTyp}
                  bsSize = 'small'
                  className={styles.parlVorstoss}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  label='Stufe'
                  wrapperClassName='wrapper'
                >
                  <div className='verticalRadioDiv'>
                    <Input
                      type = 'radio'
                      label = '1'
                      value = '1'
                      bsSize = 'small'
                      name = 'parlVorstossStufe'
                    />
                    <Input
                      type = 'radio'
                      label = '2'
                      value = '2'
                      bsSize = 'small'
                      name = 'parlVorstossStufe'
                    />
                  </div>
                </Input>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  label='Ebene'
                  wrapperClassName='wrapper'
                >
                  <div className='verticalRadioDiv'>
                    <Input
                      type = 'radio'
                      label = 'Kanton'
                      value = 'Kanton'
                      bsSize = 'small'
                      name = 'parlVorstossEbene'
                    />
                    <Input
                      type = 'radio'
                      label = 'Bund'
                      value = 'Bund'
                      bsSize = 'small'
                      name = 'parlVorstossEbene'
                    />
                  </div>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = 'textarea'
                  label = 'Vermerk'
                  value = {geschaeft.vermerk}
                  bsSize = 'small'
                  className={styles.geschaeft}
                />
              </Col>
              <Col xs={3} sm={3} md={3} lg={3}></Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  label='Zuständigkeit'
                  wrapperClassName='wrapper'
                >
                  <div className='verticalRadioDiv'>
                    <Input
                      type = 'radio'
                      label = 'haupt'
                      value = 'hauptzuständig'
                      bsSize = 'small'
                      name = 'parlVorstossZustaendigkeitAwel'
                    />
                    <Input
                      type = 'radio'
                      label = 'mitbericht'
                      value = 'mitberichtzuständig'
                      bsSize = 'small'
                      name = 'parlVorstossZustaendigkeitAwel'
                    />
                  </div>
                </Input>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  label='Erlassform'
                  wrapperClassName='wrapper'
                >
                  <div className='verticalRadioDiv'>
                    <Input
                      type = 'radio'
                      label = 'Gesetz'
                      value = 'Gesetz'
                      bsSize = 'small'
                      name = 'erlassform'
                    />
                    <Input
                      type = 'radio'
                      label = 'Verordnung'
                      value = 'Verordnung'
                      bsSize = 'small'
                      name = 'erlassform'
                    />
                  </div>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7}>
              </Col>
              <Col xs={5} sm={5} md={5} lg={5}>
              </Col>
            </Row>
          </Grid>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Geschaeft
