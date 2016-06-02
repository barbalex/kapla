'use strict'

import React, { Component, PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import moment from 'moment'
moment.locale('de')
import styles from './AreaHistory.css'
import getHistoryOfGeschaeft from '../src/getHistoryOfGeschaeft'

class AreaHistory extends Component {
  static propTypes = {
    geschaefte: PropTypes.array,
    geschaeft: PropTypes.object,
    activeId: PropTypes.number,
    geschaeftToggleActivated: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired
  }

  onClickHistoryGeschaeft = (idGeschaeft) => {
    const { geschaeftToggleActivated } = this.props
    geschaeftToggleActivated(idGeschaeft)
  }

  history = () => {
    const { geschaefte, activeId } = this.props
    const history = getHistoryOfGeschaeft(geschaefte, activeId)
    // sort descending
    history.reverse()
    return history.map((id, index) => {
      const geschaeft = geschaefte.find((g) =>
        g.idGeschaeft === id
      )
      if (!geschaeft || !geschaeft.gegenstand) {
        return null
      }
      return (
        <div
          key={index}
          className={styles.areaHistoryFields}
          onClick={() => this.onClickHistoryGeschaeft(id)}
        >
          <div className={styles.historyIdGeschaeft}>
            {id}
          </div>
          <div className={styles.historyGegenstand}>
            {geschaeft.gegenstand}
          </div>
        </div>
      )
    })
  }

  render() {
    const { geschaeft, blur, change } = this.props
    return (
      <div className={styles.areaHistory}>
        <div className={styles.areaHistoryTitle}>
          Historie
        </div>
        <ControlLabel className={styles.labelVorgeschaeft}>
          Vorgeschäft
        </ControlLabel>
        <div className={styles.fieldVorgeschaeft}>
          <FormControl
            type="number"
            value={geschaeft.idVorgeschaeft || ''}
            name="idVorgeschaeft"
            onChange={change}
            onBlur={blur}
            bsSize="small"
            placeholder="ID"
            tabIndex={99}
          />
        </div>
        <div className={styles.areaHistoryFieldsContainer}>
          {this.history()}
        </div>
      </div>
    )
  }
}

export default AreaHistory
