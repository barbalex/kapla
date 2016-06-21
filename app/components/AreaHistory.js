'use strict'

import React, { Component, PropTypes } from 'react'
import { FormControl, ControlLabel } from 'react-bootstrap'
import moment from 'moment'
moment.locale('de')
import styles from './AreaHistory.css'
import AreaHistoryRows from '../containers/AreaHistoryRows'

class AreaHistory extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    blur: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired
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
        <AreaHistoryRows />
      </div>
    )
  }
}

export default AreaHistory
