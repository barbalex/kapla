'use strict'

import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import styles from './ModalMessage.css'

class ModalMessage extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  render() {
    const { message } = this.props
    const bodyStyles = ['modal', styles.body].join(' ')

    console.log('components/ModalMessage, render, message', message)

    return (
      <Modal.Dialog bsSize="small" dialogClassName={styles.modal}>
        <Modal.Body bsClass={bodyStyles}>
          <p>{message}</p>
        </Modal.Body>
      </Modal.Dialog>
    )
  }
}

export default ModalMessage
