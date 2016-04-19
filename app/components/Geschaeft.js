'use strict'

import React, { Component, PropTypes } from 'react'
import { FormGroup, FormControl, ControlLabel, Radio, InputGroup, Grid, Row, Col } from 'react-bootstrap'
import styles from './Geschaeft.css'

class Geschaeft extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    activeId: PropTypes.number,
    geschaefteChangeState: PropTypes.func.isRequired,
    changeGeschaeftInDb: PropTypes.func.isRequired,
    rechtsmittelerledigungOptions: PropTypes.array.isRequired,
    parlVorstossTypOptions: PropTypes.array.isRequired,
    statusOptions: PropTypes.array.isRequired,
    geschaeftsartOptions: PropTypes.array.isRequired,
    geschaefteLayout: PropTypes.object.isRequired
  }

  change = (e) => {
    const { activeId, geschaefteChangeState } = this.props
    const { type, name, dataset } = e.target
    let { value } = e.target
    if (type === 'radio') {
      value = dataset.value
      // blur does not occur in radio
      this.blur(e)
    }
    geschaefteChangeState(activeId, name, value)
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
      geschaeftsartOptions,
      geschaefteLayout
    } = this.props

    const geschaeft = geschaefte.find((g) => g.idGeschaeft === activeId)

    // need width to set layout for differing widths
    const geschaefteLayoutWidth = geschaefteLayout.width
    const geschaeftWidthPercent = geschaefteLayout.config.content[0].content[1].width
    const geschaeftWidth = geschaefteLayoutWidth * geschaeftWidthPercent / 100
    const wrapperClass = geschaeftWidth < 500 ? styles.wrapperNarrow : styles.wrapperWide

    if (geschaeft && geschaeft.idGeschaeft) {
      return (
        <div>
          <div className={wrapperClass}>
            <div className={styles.geschaeft}>geschaeft</div>
            <div className={styles.nummern}>nummern</div>
            <div className={styles.fristen}>Fristen</div>
            <div className={styles.personen}>Personen</div>
            <div className={styles.baum}>Baum</div>
          </div>
          <div>
            <Grid fluid>
              <Row>
                <Col xs={7} sm={7} md={7} lg={7} className={styles.bereichTitel}>Geschäft</Col>
                <Col xs={5} sm={5} md={5} lg={5} className={styles.bereichTitel}>Nummern</Col>
              </Row>
              <Row>
                <Col xs={7} sm={7} md={7} lg={7}>
                  <FormGroup>
                    <ControlLabel>Gegenstand</ControlLabel>
                    <FormControl
                      type = "textarea"
                      value = {geschaeft.gegenstand || ''}
                      name = "gegenstand"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className = {[styles.geschaeft, styles.gegenstand].join(' ')}
                      tabIndex = {1}
                      autoFocus
                    />
                  </FormGroup>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4} />
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>ID</ControlLabel>
                    <FormControl
                      type = "number"
                      value = {geschaeft.idGeschaeft}
                      bsSize = "small"
                      disabled
                      className={[styles.nr, styles.idGeschaeft].join(' ')}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={7} sm={7} md={7} lg={7}>
                  <FormGroup>
                    <ControlLabel>Ort</ControlLabel>
                    <FormControl
                      type = "text"
                      value = {geschaeft.ort || ''}
                      name = "ort"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.geschaeft}
                      tabIndex = {2}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>AWEL Nr.</ControlLabel>
                    <FormControl
                      type = "number"
                      value = {geschaeft.entscheidAwelNr || ''}
                      name = "entscheidAwelNr"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.nr}
                      tabIndex = {11}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>Jahr</ControlLabel>
                    <FormControl
                      type = "number"
                      value = {geschaeft.entscheidAwelJahr || ''}
                      name = "entscheidAwelJahr"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.nr}
                      tabIndex = {12}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1} />
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>BDV&nbsp;&nbsp;&nbsp;&nbsp;Nr.</ControlLabel>
                    <FormControl
                      type = "number"
                      value = {geschaeft.entscheidBdvNr || ''}
                      name = "entscheidBdvNr"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.nr}
                      tabIndex = {13}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>Jahr</ControlLabel>
                    <FormControl
                      type = "number"
                      value = {geschaeft.entscheidBdvJahr || ''}
                      name = "entscheidBdvJahr"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.nr}
                      tabIndex = {14}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <FormGroup>
                    <ControlLabel>Geschäftsart</ControlLabel>
                    <FormControl
                      componentClass="select"
                      value = {geschaeft.geschaeftsart || ''}
                      name = "geschaeftsart"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.geschaeft}
                      tabIndex = {3}
                    >
                      {this.options(geschaeftsartOptions)}
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>
                  <FormGroup>
                    <ControlLabel>Status</ControlLabel>
                    <FormControl
                      componentClass="select"
                      value = {geschaeft.status || ''}
                      name = "status"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.geschaeft}
                      tabIndex = {4}
                    >
                      {this.options(statusOptions)}
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>Vorgeschäft</ControlLabel>
                    <FormControl
                      type = "number"
                      value = {geschaeft.idVorgeschaeft || ''}
                      name = "idVorgeschaeft"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className = {styles.geschaeft}
                      placeholder = "ID"
                      tabIndex = {5}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>Direktion</ControlLabel>
                    <FormControl
                      type = "text"
                      value = {geschaeft.zustaendigeDirektion || ''}
                      name = "zustaendigeDirektion"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.geschaeft}
                      tabIndex = {6}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>KR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nr.</ControlLabel>
                    <FormControl
                      type = "number"
                      value = {geschaeft.entscheidKrNr || ''}
                      name = "entscheidKrNr"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.nr}
                      tabIndex = {15}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>Jahr</ControlLabel>
                    <FormControl
                      type = "number"
                      value = {geschaeft.entscheidKrJahr || ''}
                      name = "entscheidKrJahr"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.nr}
                      tabIndex = {16}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1} />
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>RRB&nbsp;&nbsp;&nbsp;&nbsp;Nr.</ControlLabel>
                    <FormControl
                      type = "number"
                      value = {geschaeft.entscheidRrbNr || ''}
                      name = "entscheidRrbNr"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.nr}
                      tabIndex = {17}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>Jahr</ControlLabel>
                    <FormControl
                      type = "number"
                      value = {geschaeft.entscheidRrbJahr || ''}
                      name = "entscheidRrbJahr"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.nr}
                      tabIndex = {18}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={7} sm={7} md={7} lg={7}>
                  <FormGroup>
                    <ControlLabel>Details</ControlLabel>
                    <FormControl
                      type = "textarea"
                      value = {geschaeft.details || ''}
                      name = "details"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.geschaeft}
                      rows = {4}
                      tabIndex = {7}
                    />
                  </FormGroup>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4}>
                  <FormGroup>
                    <ControlLabel>Aktenstandort</ControlLabel>
                    <FormControl
                      type = "text"
                      value = {geschaeft.aktenstandort || ''}
                      name = "aktenstandort"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.nr}
                      tabIndex = {19}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>Nr.</ControlLabel>
                    <FormControl
                      type = "text"
                      value = {geschaeft.aktennummer || ''}
                      name = "aktennummer"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.nr}
                      tabIndex = {20}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={7} sm={7} md={7} lg={7}>
                  <FormGroup>
                    <ControlLabel>Nächster Schritt</ControlLabel>
                    <FormControl
                      type = "textarea"
                      value = {geschaeft.naechsterSchritt || ''}
                      name = "naechsterSchritt"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className = {styles.geschaeft}
                      rows = {3}
                      tabIndex = {8}
                    />
                  </FormGroup>
                </Col>
                <Col xs={5} sm={5} md={5} lg={5} className={styles.bereichTitel}>
                  <p className={styles.bereichTitelParlVorstP}>Parlamentarische Vorstösse</p>
                  <FormGroup>
                    <ControlLabel>Typ</ControlLabel>
                    <FormControl
                      componentClass="select"
                      value = {geschaeft.parlVorstossTyp || ''}
                      name = "parlVorstossTyp"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.parlVorstoss}
                      tabIndex = {21}
                    >
                      {this.options(parlVorstossTypOptions)}
                    </FormControl>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={7} sm={7} md={7} lg={7}>
                  <FormGroup>
                    <ControlLabel>Vermerk</ControlLabel>
                    <FormControl
                      type = "textarea"
                      value = {geschaeft.vermerk || ''}
                      name = "vermerk"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.geschaeft}
                      rows = {4}
                      tabIndex = {9}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>Stufe</ControlLabel>
                    <InputGroup
                      wrapperClassName="wrapper"
                    >
                      <div className="verticalRadioDiv">
                        <div>
                          <ControlLabel>1</ControlLabel>
                          <Radio
                            data-value = {1}
                            checked = {geschaeft.parlVorstossStufe == 1}
                            onChange = {this.change}
                            bsSize = "small"
                            name = "parlVorstossStufe"
                            tabIndex = {22}
                          />
                        </div>
                        <div>
                          <ControlLabel>2</ControlLabel>
                          <Radio
                            data-value = {2}
                            checked = {geschaeft.parlVorstossStufe == 2}
                            name = "parlVorstossStufe"
                            onChange = {this.change}
                            bsSize = "small"
                            tabIndex = {23}
                          />
                        </div>
                      </div>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>Ebene</ControlLabel>
                    <InputGroup
                      wrapperClassName="wrapper"
                    >
                      <div className="verticalRadioDiv">
                        <ControlLabel>Kanton</ControlLabel>
                        <Radio
                          data-value = "Kanton"
                          checked = {geschaeft.parlVorstossEbene === 'Kanton'}
                          name = "parlVorstossEbene"
                          onChange = {this.change}
                          bsSize = "small"
                          tabIndex = {24}
                        />
                        <ControlLabel>Bund</ControlLabel>
                        <Radio
                          data-value = "Bund"
                          checked = {geschaeft.parlVorstossEbene === 'Bund'}
                          onChange = {this.change}
                          name = "parlVorstossEbene"
                          bsSize = "small"
                          tabIndex = {25}
                        />
                      </div>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>Zuständigkeit</ControlLabel>
                    <InputGroup
                      wrapperClassName="wrapper"
                    >
                      <div className="verticalRadioDiv">
                        <ControlLabel>haupt</ControlLabel>
                        <Radio
                          data-value = "hauptzuständig"
                          checked = {geschaeft.parlVorstossZustaendigkeitAwel === 'hauptzuständig'}
                          name = "parlVorstossZustaendigkeitAwel"
                          onChange = {this.change}
                          bsSize = "small"
                          tabIndex = {26}
                        />
                        <ControlLabel>mitbericht</ControlLabel>
                        <Radio
                          data-value = "mitberichtzuständig"
                          checked = {geschaeft.parlVorstossZustaendigkeitAwel === 'mitberichtzuständig'}
                          name = "parlVorstossZustaendigkeitAwel"
                          onChange = {this.change}
                          bsSize = "small"
                          tabIndex = {27}
                        />
                      </div>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <FormGroup>
                    <ControlLabel>Erlassform</ControlLabel>
                    <InputGroup
                      wrapperClassName="wrapper"
                    >
                      <div className="verticalRadioDiv">
                        <ControlLabel>Gesetz</ControlLabel>
                        <Radio
                          data-value = "Gesetz"
                          checked = {geschaeft.erlassform === 'Gesetz'}
                          name = "erlassform"
                          onChange = {this.change}
                          bsSize = "small"
                          tabIndex = {28}
                        />
                        <ControlLabel>Verordnung</ControlLabel>
                        <Radio
                          data-value = "Verordnung"
                          checked = {geschaeft.erlassform === 'Verordnung'}
                          name = "erlassform"
                          onChange = {this.change}
                          bsSize = "small"
                          tabIndex = {29}
                        />
                      </div>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1} />
              </Row>
              <Row>
                <Col xs={7} sm={7} md={7} lg={7}>
                  <FormGroup>
                    <ControlLabel>Erledigung</ControlLabel>
                    <FormControl
                      componentClass="select"
                      value = {geschaeft.rechtsmittelerledigung || ''}
                      name = "rechtsmittelerledigung"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.geschaeft}
                      tabIndex = {10}
                    >
                      {this.options(rechtsmittelerledigungOptions)}
                    </FormControl>
                  </FormGroup>
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
        </div>
      )
    }
    return null
  }
}

export default Geschaeft
