'use strict'

import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import styles from './ModalMessage.css'

class ModalMessage extends Component {
  static propTypes = {
    messageTextLine1: PropTypes.string.isRequired,
    messageTextLine2: PropTypes.string
  }

  render() {
    const { messageTextLine1, messageTextLine2 } = this.props

    return (
      <Modal.Dialog
        bsSize={messageTextLine2 ? 'large' : 'small'}
        dialogClassName={styles.modal}
      >
        <Modal.Body>
          <p className={styles.p}>
            {messageTextLine1}
          </p>
          {
            messageTextLine2 &&
            <p className={styles.p}>
              {messageTextLine2}
            </p>
          }
        </Modal.Body>
      </Modal.Dialog>
    )
  }
}

export default ModalMessage
