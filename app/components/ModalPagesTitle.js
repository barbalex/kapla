'use strict'

import React, { Component, PropTypes } from 'react'
import { Modal, Button, Input } from 'react-bootstrap'

class ModalPagesTitle extends Component {
  static propTypes = {
    title: PropTypes.string,
    pagesSetTitle: PropTypes.func.isRequired,
    pagesQueryTitle: PropTypes.func.isRequired
  }

  onKeyPressTitle = (e) => {
    const { pagesQueryTitle } = this.props
    if (e.key === 'Enter') {
      pagesQueryTitle(false)
    }
  }

  change = (e) => {
    const { pagesSetTitle } = this.props
    const { value } = e.target
    pagesSetTitle(value)
  }

  render() {
    const { title, pagesQueryTitle } = this.props

    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Berichttitel erfassen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="text"
            label="Titel"
            value={title}
            onChange={this.change}
            onKeyPress={this.onKeyPressTitle}
            bsSize="small"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={() => pagesQueryTitle(false)}>schliessen</Button>
        </Modal.Footer>
      </Modal.Dialog>
    )
  }
}

export default ModalPagesTitle
