'use strict'

import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import styles from './ModalMessage.css'

class ModalMessage extends Component {
  static propTypes = {
    messageText: PropTypes.string.isRequired
  }

  render() {
    const { messageText } = this.props

    return (
      <Modal.Dialog bsSize="small" dialogClassName={styles.modal}>
        <Modal.Body>
          <p className={styles.p}>{messageText}</p>
        </Modal.Body>
      </Modal.Dialog>
    )
  }
}

export default ModalMessage
