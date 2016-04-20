'use strict'

import React, { Component, PropTypes } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Radio, InputGroup, Grid, Row, Col } from 'react-bootstrap'
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
    const totalWidth = geschaefteLayoutWidth * geschaeftWidthPercent / 100
    const wrapperClass = totalWidth < 500 ? styles.wrapperNarrow : styles.wrapperWide

    if (geschaeft && geschaeft.idGeschaeft) {
      return (
        <div className={styles.body}>
          <div className={wrapperClass}>
            <div className={styles.geschaeft}>
              <Form>
                <div className={styles.bereichTitel}>Geschäft</div>
                <FormGroup>
                    <ControlLabel>Gegenstand</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      value = {geschaeft.gegenstand || ''}
                      name = "gegenstand"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className = {[styles.input, styles.gegenstand].join(' ')}
                      tabIndex = {1}
                      autoFocus
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Ort</ControlLabel>
                    <FormControl
                      type = "text"
                      value = {geschaeft.ort || ''}
                      name = "ort"
                      onChange = {this.change}
                      onBlur = {this.blur}
                      bsSize = "small"
                      className={styles.input}
                      tabIndex = {2}
                    />
                  </FormGroup>
              </Form>
              <Form inline>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Geschäftsart</ControlLabel>
                  <FormControl
                    componentClass="select"
                    value = {geschaeft.geschaeftsart || ''}
                    name = "geschaeftsart"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={styles.input}
                    tabIndex = {3}
                  >
                    {this.options(geschaeftsartOptions)}
                  </FormControl>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Status</ControlLabel>
                  <FormControl
                    componentClass="select"
                    value = {geschaeft.status || ''}
                    name = "status"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={styles.input}
                    tabIndex = {4}
                  >
                    {this.options(statusOptions)}
                  </FormControl>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Vorgeschäft</ControlLabel>
                  <FormControl
                    type = "number"
                    value = {geschaeft.idVorgeschaeft || ''}
                    name = "idVorgeschaeft"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className = {[styles.input, styles.typeNr].join(' ')}
                    placeholder = "ID"
                    tabIndex = {5}
                  />
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Direktion</ControlLabel>
                  <FormControl
                    type = "text"
                    value = {geschaeft.zustaendigeDirektion || ''}
                    name = "zustaendigeDirektion"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={[styles.input, styles.fieldDirektion].join(' ')}
                    tabIndex = {6}
                  />
                </FormGroup>
              </Form>
              <Form>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Details</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value = {geschaeft.details || ''}
                    name = "details"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={styles.input}
                    rows = {4}
                    tabIndex = {7}
                  />
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Nächster Schritt</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value = {geschaeft.naechsterSchritt || ''}
                    name = "naechsterSchritt"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className = {styles.input}
                    rows = {3}
                    tabIndex = {8}
                  />
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Vermerk</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value = {geschaeft.vermerk || ''}
                    name = "vermerk"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={styles.input}
                    rows = {4}
                    tabIndex = {9}
                  />
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Erledigung</ControlLabel>
                  <FormControl
                    componentClass="select"
                    value = {geschaeft.rechtsmittelerledigung || ''}
                    name = "rechtsmittelerledigung"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={styles.input}
                    tabIndex = {10}
                  >
                    {this.options(rechtsmittelerledigungOptions)}
                  </FormControl>
                </FormGroup>
              </Form>
            </div>
            <div className={styles.nummern}>
              <div className={styles.bereichTitel}>Nummern</div>
              <Form inline>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>ID</ControlLabel>
                  <FormControl
                    type = "number"
                    value = {geschaeft.idGeschaeft}
                    bsSize = "small"
                    disabled
                    className={[styles.input, styles.typeNr].join(' ')}
                  />
                </FormGroup>
              </Form>
              <Form inline>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>AWEL Nr.</ControlLabel>
                  <FormControl
                    type = "number"
                    value = {geschaeft.entscheidAwelNr || ''}
                    name = "entscheidAwelNr"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={[styles.input, styles.typeNr].join(' ')}
                    tabIndex = {11}
                  />
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Jahr</ControlLabel>
                  <FormControl
                    type = "number"
                    value = {geschaeft.entscheidAwelJahr || ''}
                    name = "entscheidAwelJahr"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={[styles.input, styles.typeNr].join(' ')}
                    tabIndex = {12}
                  />
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>BDV&nbsp;&nbsp;&nbsp;&nbsp;Nr.</ControlLabel>
                  <FormControl
                    type = "number"
                    value = {geschaeft.entscheidBdvNr || ''}
                    name = "entscheidBdvNr"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={[styles.input, styles.typeNr].join(' ')}
                    tabIndex = {13}
                  />
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Jahr</ControlLabel>
                  <FormControl
                    type = "number"
                    value = {geschaeft.entscheidBdvJahr || ''}
                    name = "entscheidBdvJahr"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={[styles.input, styles.typeNr].join(' ')}
                    tabIndex = {14}
                  />
                </FormGroup>
              </Form>
              <Form inline>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>KR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nr.</ControlLabel>
                  <FormControl
                    type = "number"
                    value = {geschaeft.entscheidKrNr || ''}
                    name = "entscheidKrNr"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={[styles.input, styles.typeNr].join(' ')}
                    tabIndex = {15}
                  />
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Jahr</ControlLabel>
                  <FormControl
                    type = "number"
                    value = {geschaeft.entscheidKrJahr || ''}
                    name = "entscheidKrJahr"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={[styles.input, styles.typeNr].join(' ')}
                    tabIndex = {16}
                  />
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>RRB&nbsp;&nbsp;&nbsp;&nbsp;Nr.</ControlLabel>
                  <FormControl
                    type = "number"
                    value = {geschaeft.entscheidRrbNr || ''}
                    name = "entscheidRrbNr"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={[styles.input, styles.typeNr].join(' ')}
                    tabIndex = {17}
                  />
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Jahr</ControlLabel>
                  <FormControl
                    type = "number"
                    value = {geschaeft.entscheidRrbJahr || ''}
                    name = "entscheidRrbJahr"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={[styles.input, styles.typeNr].join(' ')}
                    tabIndex = {18}
                  />
                </FormGroup>
              </Form>
              <Form inline>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Aktenstandort</ControlLabel>
                  <FormControl
                    type = "text"
                    value = {geschaeft.aktenstandort || ''}
                    name = "aktenstandort"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={[styles.input, styles.fieldAktenstandort].join(' ')}
                    tabIndex = {19}
                  />
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Nr.</ControlLabel>
                  <FormControl
                    type = "text"
                    value = {geschaeft.aktennummer || ''}
                    name = "aktennummer"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={[styles.input, styles.typeNr].join(' ')}
                    tabIndex = {20}
                  />
                </FormGroup>
              </Form>
            </div>
            <div className={styles.parlVorst}>
              <p className={styles.bereichTitel}>Parlamentarische Vorstösse</p>
              <Form>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Typ</ControlLabel>
                  <FormControl
                    componentClass="select"
                    value = {geschaeft.parlVorstossTyp || ''}
                    name = "parlVorstossTyp"
                    onChange = {this.change}
                    onBlur = {this.blur}
                    bsSize = "small"
                    className={styles.input}
                    tabIndex = {21}
                  >
                    {this.options(parlVorstossTypOptions)}
                  </FormControl>
                </FormGroup>
              </Form>
              <Form inline>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Stufe</ControlLabel>
                  <div>
                    <Radio inline
                      data-value = {1}
                      checked = {geschaeft.parlVorstossStufe == 1}
                      onChange = {this.change}
                      bsSize = "small"
                      name = "parlVorstossStufe"
                      tabIndex = {22}
                    >
                      1
                    </Radio>
                  </div>
                  <div>
                    <Radio inline
                      data-value = {2}
                      checked = {geschaeft.parlVorstossStufe == 2}
                      name = "parlVorstossStufe"
                      onChange = {this.change}
                      bsSize = "small"
                      tabIndex = {23}
                    >
                      2
                    </Radio>
                  </div>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Ebene</ControlLabel>
                  <div>
                    <Radio
                      data-value = "Kanton"
                      checked = {geschaeft.parlVorstossEbene === 'Kanton'}
                      name = "parlVorstossEbene"
                      onChange = {this.change}
                      bsSize = "small"
                      tabIndex = {24}
                    >
                      Kanton
                    </Radio>
                  </div>
                  <div>
                    <Radio
                      data-value = "Bund"
                      checked = {geschaeft.parlVorstossEbene === 'Bund'}
                      onChange = {this.change}
                      name = "parlVorstossEbene"
                      bsSize = "small"
                      tabIndex = {25}
                    >
                      Bund
                    </Radio>
                  </div>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Zuständigkeit</ControlLabel>
                  <div>
                    <Radio
                      data-value = "hauptzuständig"
                      checked = {geschaeft.parlVorstossZustaendigkeitAwel === 'hauptzuständig'}
                      name = "parlVorstossZustaendigkeitAwel"
                      onChange = {this.change}
                      bsSize = "small"
                      tabIndex = {26}
                    >
                      haupt
                    </Radio>
                  </div>
                  <div>
                    <Radio
                      data-value = "mitberichtzuständig"
                      checked = {geschaeft.parlVorstossZustaendigkeitAwel === 'mitberichtzuständig'}
                      name = "parlVorstossZustaendigkeitAwel"
                      onChange = {this.change}
                      bsSize = "small"
                      tabIndex = {27}
                    >
                      mitbericht
                    </Radio>
                  </div>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <ControlLabel className={styles.label}>Erlassform</ControlLabel>
                    <div className="verticalRadioDiv">
                      <Radio
                        data-value = "Gesetz"
                        checked = {geschaeft.erlassform === 'Gesetz'}
                        name = "erlassform"
                        onChange = {this.change}
                        bsSize = "small"
                        tabIndex = {28}
                      >
                        Gesetz
                      </Radio>
                    </div>
                    <div>
                      <Radio
                        data-value = "Verordnung"
                        checked = {geschaeft.erlassform === 'Verordnung'}
                        name = "erlassform"
                        onChange = {this.change}
                        bsSize = "small"
                        tabIndex = {29}
                      >
                        Verordnung
                      </Radio>
                    </div>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

export default Geschaeft
