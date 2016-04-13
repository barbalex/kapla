'use strict'

import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-bootstrap'

class ModalMessage extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  render() {
    const { message } = this.props

    return (
      <Modal.Dialog>
        <Modal.Body>
          {message}
        </Modal.Body>
      </Modal.Dialog>
    )
  }
}

export default ModalMessage
