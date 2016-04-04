import React, { Component, PropTypes } from 'react'
import { Input, Grid, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import styles from './Geschaeft.css'
import Navbar from '../containers/Navbar.js'
import ModalGeschaeftDelete from '../containers/ModalGeschaeftDelete.js'

class Geschaeft extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    activeId: PropTypes.number,
    willDeleteGeschaeft: PropTypes.bool,
    aendereGeschaeft: PropTypes.func.isRequired
  }

  change = (e) => {
    const { activeId, aendereGeschaeft } = this.props
    const { type, name, dataset } = e.target
    let { value } = e.target
    if (type === 'radio') value = dataset.value
    aendereGeschaeft(activeId, name, value)
  }

  render () {
    const {
      geschaefte,
      activeId,
      willDeleteGeschaeft
    } = this.props

    const geschaeft = geschaefte.find((geschaeft) => geschaeft.idGeschaeft === activeId)

    if (geschaeft && geschaeft.idGeschaeft) {
      return (
        <div>
          {willDeleteGeschaeft && <ModalGeschaeftDelete />}
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
                  name = 'gegenstand'
                  onChange = {this.change}
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
                  name = 'ort'
                  onChange = {this.change}
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
                  name = 'entscheidAwelNr'
                  onChange = {this.change}
                  bsSize = 'small'
                  className={styles.nr}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = 'number'
                  label = 'Jahr'
                  value = {geschaeft.entscheidAwelJahr}
                  name = 'entscheidAwelJahr'
                  onChange = {this.change}
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
                  name = 'geschaeftsart'
                  onChange = {this.change}
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
                  name = 'entscheidBdvNr'
                  onChange = {this.change}
                  bsSize = 'small'
                  className={styles.nr}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = 'number'
                  label = 'Jahr'
                  value = {geschaeft.entscheidBdvJahr}
                  name = 'entscheidBdvJahr'
                  onChange = {this.change}
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
                  name = 'status'
                  onChange = {this.change}
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
                  name = 'entscheidKrNr'
                  onChange = {this.change}
                  bsSize = 'small'
                  className={styles.nr}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = 'number'
                  label = 'Jahr'
                  value = {geschaeft.entscheidKrJahr}
                  name = 'entscheidKrJahr'
                  onChange = {this.change}
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
                  name = 'zustaendigeDirektion'
                  onChange = {this.change}
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
                  name = 'entscheidRrbNr'
                  onChange = {this.change}
                  bsSize = 'small'
                  className={styles.nr}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = 'number'
                  label = 'Jahr'
                  value = {geschaeft.entscheidRrbJahr}
                  name = 'entscheidRrbJahr'
                  onChange = {this.change}
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
                  name = 'idVorgeschaeft'
                  onChange = {this.change}
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
                  name = 'aktenstandort'
                  onChange = {this.change}
                  bsSize = 'small'
                  className={styles.nr}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = 'text'
                  label = 'Nr.'
                  value = {geschaeft.aktennummer}
                  name = 'aktennummer'
                  onChange = {this.change}
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
                  name = 'details'
                  onChange = {this.change}
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
                  name = 'naechsterSchritt'
                  onChange = {this.change}
                  bsSize = 'small'
                  className = {styles.geschaeft}
                />
              </Col>
              <Col xs={3} sm={3} md={3} lg={3}>
                <Input
                  type = 'text'
                  label = 'Typ'
                  value = {geschaeft.parlVorstossTyp}
                  name = 'parlVorstossTyp'
                  onChange = {this.change}
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
                      data-value = {1}
                      value = {geschaeft.parlVorstossStufe}
                      checked = {geschaeft.parlVorstossStufe == 1}
                      onChange = {this.change}
                      bsSize = 'small'
                      name = 'parlVorstossStufe'
                    />
                    <Input
                      type = 'radio'
                      label = '2'
                      data-value = {2}
                      value = {geschaeft.parlVorstossStufe}
                      checked = {geschaeft.parlVorstossStufe == 2}
                      name = 'parlVorstossStufe'
                      onChange = {this.change}
                      bsSize = 'small'
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
                      data-value = 'Kanton'
                      value = {geschaeft.parlVorstossEbene}
                      checked = {geschaeft.parlVorstossEbene === 'Kanton'}
                      name = 'parlVorstossEbene'
                      onChange = {this.change}
                      bsSize = 'small'
                    />
                    <Input
                      type = 'radio'
                      label = 'Bund'
                      data-value = 'Bund'
                      value = {geschaeft.parlVorstossEbene}
                      checked = {geschaeft.parlVorstossEbene === 'Bund'}
                      onChange = {this.change}
                      name = 'parlVorstossEbene'
                      bsSize = 'small'
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
                  name = 'vermerk'
                  onChange = {this.change}
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
                      name = 'parlVorstossZustaendigkeitAwel'
                      onChange = {this.change}
                      bsSize = 'small'
                    />
                    <Input
                      type = 'radio'
                      label = 'mitbericht'
                      value = 'mitberichtzuständig'
                      name = 'parlVorstossZustaendigkeitAwel'
                      onChange = {this.change}
                      bsSize = 'small'
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
                      name = 'erlassform'
                      onChange = {this.change}
                      bsSize = 'small'
                    />
                    <Input
                      type = 'radio'
                      label = 'Verordnung'
                      value = 'Verordnung'
                      name = 'erlassform'
                      onChange = {this.change}
                      bsSize = 'small'
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
