'use strict'

import React, { Component, PropTypes } from 'react'
import { Input, Grid, Row, Col } from 'react-bootstrap'
import styles from './Geschaeft.css'

class Geschaeft extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    activeId: PropTypes.number,
    aendereGeschaefteState: PropTypes.func.isRequired,
    changeGeschaeftInDb: PropTypes.func.isRequired,
    rechtsmittelerledigungOptions: PropTypes.array.isRequired,
    parlVorstossTypOptions: PropTypes.array.isRequired,
    statusOptions: PropTypes.array.isRequired,
    geschaeftsartOptions: PropTypes.array.isRequired
  }

  change = (e) => {
    const { activeId, aendereGeschaefteState } = this.props
    const { type, name, dataset } = e.target
    let { value } = e.target
    if (type === 'radio') {
      value = dataset.value
      // blur does not occur in radio
      this.blur(e)
    }
    aendereGeschaefteState(activeId, name, value)
  }

  blur = (e) => {
    const { activeId, changeGeschaeftInDb } = this.props
    const { type, name, dataset } = e.target
    let { value } = e.target
    if (type === 'radio') value = dataset.value
    changeGeschaeftInDb(activeId, name, value)
  }

  options = (values) => {
    const options = values.map((val, index) => <option key={index + 1} value={val}>{val}</option>)
    options.unshift(<option key={0} value=""></option>)
    return options
  }

  render() {
    const {
      geschaefte,
      activeId,
      rechtsmittelerledigungOptions,
      parlVorstossTypOptions,
      statusOptions,
      geschaeftsartOptions
    } = this.props

    const geschaeft = geschaefte.find((g) => g.idGeschaeft === activeId)

    if (geschaeft && geschaeft.idGeschaeft) {
      return (
        <div>
          <Grid fluid>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7} className={styles.bereichTitel}>Geschäft</Col>
              <Col xs={5} sm={5} md={5} lg={5} className={styles.bereichTitel}>Nummern</Col>
            </Row>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = "textarea"
                  label = "Gegenstand"
                  value = {geschaeft.gegenstand || ''}
                  name = "gegenstand"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className = {[styles.geschaeft, styles.gegenstand].join(' ')}
                  tabIndex = {1}
                  autoFocus
                />
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} />
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = "number"
                  label = "ID"
                  value = {geschaeft.idGeschaeft}
                  bsSize = "small"
                  disabled
                  className={[styles.nr, styles.idGeschaeft].join(' ')}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = "text"
                  label = "Ort"
                  value = {geschaeft.ort || ''}
                  name = "ort"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.geschaeft}
                  tabIndex = {2}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = "number"
                  label = "AWEL Nr."
                  value = {geschaeft.entscheidAwelNr || ''}
                  name = "entscheidAwelNr"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.nr}
                  tabIndex = {11}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = "number"
                  label = "Jahr"
                  value = {geschaeft.entscheidAwelJahr || ''}
                  name = "entscheidAwelJahr"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.nr}
                  tabIndex = {12}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1} />
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = "number"
                  label = "BDV&nbsp;&nbsp;&nbsp;&nbsp;Nr."
                  value = {geschaeft.entscheidBdvNr || ''}
                  name = "entscheidBdvNr"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.nr}
                  tabIndex = {13}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = "number"
                  label = "Jahr"
                  value = {geschaeft.entscheidBdvJahr || ''}
                  name = "entscheidBdvJahr"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.nr}
                  tabIndex = {14}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3} sm={3} md={3} lg={3}>
                <Input
                  type = "select"
                  label = "Geschäftsart"
                  value = {geschaeft.geschaeftsart || ''}
                  name = "geschaeftsart"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.geschaeft}
                  tabIndex = {3}
                >
                  {this.options(geschaeftsartOptions)}
                </Input>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2}>
                <Input
                  type = "select"
                  label = "Status"
                  value = {geschaeft.status || ''}
                  name = "status"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.geschaeft}
                  tabIndex = {4}
                >
                  {this.options(statusOptions)}
                </Input>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = "number"
                  label = "Vorgeschäft"
                  value = {geschaeft.idVorgeschaeft || ''}
                  name = "idVorgeschaeft"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className = {styles.geschaeft}
                  placeholder = "ID"
                  tabIndex = {5}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = "text"
                  label = "Direktion"
                  value = {geschaeft.zustaendigeDirektion || ''}
                  name = "zustaendigeDirektion"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.geschaeft}
                  tabIndex = {6}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = "number"
                  label = "KR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nr."
                  value = {geschaeft.entscheidKrNr || ''}
                  name = "entscheidKrNr"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.nr}
                  tabIndex = {15}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = "number"
                  label = "Jahr"
                  value = {geschaeft.entscheidKrJahr || ''}
                  name = "entscheidKrJahr"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.nr}
                  tabIndex = {16}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1} />
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = "number"
                  label = "RRB&nbsp;&nbsp;&nbsp;&nbsp;Nr."
                  value = {geschaeft.entscheidRrbNr || ''}
                  name = "entscheidRrbNr"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.nr}
                  tabIndex = {17}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = "number"
                  label = "Jahr"
                  value = {geschaeft.entscheidRrbJahr || ''}
                  name = "entscheidRrbJahr"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.nr}
                  tabIndex = {18}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = "textarea"
                  label = "Details"
                  value = {geschaeft.details || ''}
                  name = "details"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.geschaeft}
                  rows = {4}
                  tabIndex = {7}
                />
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <Input
                  type = "text"
                  label = "Aktenstandort"
                  value = {geschaeft.aktenstandort || ''}
                  name = "aktenstandort"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.nr}
                  tabIndex = {19}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  type = "text"
                  label = "Nr."
                  value = {geschaeft.aktennummer || ''}
                  name = "aktennummer"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.nr}
                  tabIndex = {20}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = "textarea"
                  label = "Nächster Schritt"
                  value = {geschaeft.naechsterSchritt || ''}
                  name = "naechsterSchritt"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className = {styles.geschaeft}
                  rows = {3}
                  tabIndex = {8}
                />
              </Col>
              <Col xs={5} sm={5} md={5} lg={5} className={styles.bereichTitel}>
                <p className={styles.bereichTitelParlVorstP}>Parlamentarische Vorstösse</p>
                <Input
                  type = "select"
                  label = "Typ"
                  value = {geschaeft.parlVorstossTyp || ''}
                  name = "parlVorstossTyp"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.parlVorstoss}
                  tabIndex = {21}
                >
                  {this.options(parlVorstossTypOptions)}
                </Input>
              </Col>
            </Row>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = "textarea"
                  label = "Vermerk"
                  value = {geschaeft.vermerk || ''}
                  name = "vermerk"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.geschaeft}
                  rows = {4}
                  tabIndex = {9}
                />
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  label="Stufe"
                  wrapperClassName="wrapper"
                >
                  <div className="verticalRadioDiv">
                    <Input
                      type = "radio"
                      label = "1"
                      data-value = {1}
                      checked = {geschaeft.parlVorstossStufe == 1}
                      onChange = {this.change}
                      bsSize = "small"
                      name = "parlVorstossStufe"
                      tabIndex = {22}
                    />
                    <Input
                      type = "radio"
                      label = "2"
                      data-value = {2}
                      checked = {geschaeft.parlVorstossStufe == 2}
                      name = "parlVorstossStufe"
                      onChange = {this.change}
                      bsSize = "small"
                      tabIndex = {23}
                    />
                  </div>
                </Input>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  label="Ebene"
                  wrapperClassName="wrapper"
                >
                  <div className="verticalRadioDiv">
                    <Input
                      type = "radio"
                      label = "Kanton"
                      data-value = "Kanton"
                      checked = {geschaeft.parlVorstossEbene === 'Kanton'}
                      name = "parlVorstossEbene"
                      onChange = {this.change}
                      bsSize = "small"
                      tabIndex = {24}
                    />
                    <Input
                      type = "radio"
                      label = "Bund"
                      data-value = "Bund"
                      checked = {geschaeft.parlVorstossEbene === 'Bund'}
                      onChange = {this.change}
                      name = "parlVorstossEbene"
                      bsSize = "small"
                      tabIndex = {25}
                    />
                  </div>
                </Input>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  label="Zuständigkeit"
                  wrapperClassName="wrapper"
                >
                  <div className="verticalRadioDiv">
                    <Input
                      type = "radio"
                      label = "haupt"
                      data-value = "hauptzuständig"
                      checked = {geschaeft.parlVorstossZustaendigkeitAwel === 'hauptzuständig'}
                      name = "parlVorstossZustaendigkeitAwel"
                      onChange = {this.change}
                      bsSize = "small"
                      tabIndex = {26}
                    />
                    <Input
                      type = "radio"
                      label = "mitbericht"
                      data-value = "mitberichtzuständig"
                      checked = {geschaeft.parlVorstossZustaendigkeitAwel === 'mitberichtzuständig'}
                      name = "parlVorstossZustaendigkeitAwel"
                      onChange = {this.change}
                      bsSize = "small"
                      tabIndex = {27}
                    />
                  </div>
                </Input>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <Input
                  label="Erlassform"
                  wrapperClassName="wrapper"
                >
                  <div className="verticalRadioDiv">
                    <Input
                      type = "radio"
                      label = "Gesetz"
                      data-value = "Gesetz"
                      checked = {geschaeft.erlassform === 'Gesetz'}
                      name = "erlassform"
                      onChange = {this.change}
                      bsSize = "small"
                      tabIndex = {28}
                    />
                    <Input
                      type = "radio"
                      label = "Verordnung"
                      data-value = "Verordnung"
                      checked = {geschaeft.erlassform === 'Verordnung'}
                      name = "erlassform"
                      onChange = {this.change}
                      bsSize = "small"
                      tabIndex = {29}
                    />
                  </div>
                </Input>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1} />
            </Row>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7}>
                <Input
                  type = "select"
                  label = "Erledigung"
                  value = {geschaeft.rechtsmittelerledigung || ''}
                  name = "rechtsmittelerledigung"
                  onChange = {this.change}
                  onBlur = {this.blur}
                  bsSize = "small"
                  className={styles.geschaeft}
                  tabIndex = {10}
                >
                  {this.options(rechtsmittelerledigungOptions)}
                </Input>
              </Col>
              <Col xs={5} sm={5} md={5} lg={5} />
            </Row>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7} />
              <Col xs={5} sm={5} md={5} lg={5} />
            </Row>
            <Row>
              <Col xs={7} sm={7} md={7} lg={7} />
              <Col xs={5} sm={5} md={5} lg={5} />
            </Row>
          </Grid>
        </div>
      )
    }
    return null
  }
}

export default Geschaeft
