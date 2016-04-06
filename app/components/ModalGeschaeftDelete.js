'use strict'

import React, { Component, PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'

class ModalGeschaeftDelete extends Component {
  static propTypes = {
    entferneGeschaeft: PropTypes.func.isRequired,
    entferneGeschaeftNicht: PropTypes.func.isRequired,
    activeId: PropTypes.number
  }

  render() {
    const {
      entferneGeschaeft,
      entferneGeschaeftNicht,
      activeId
    } = this.props

    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Geschäft löschen</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Möchten Sie das Geschäft Nr. {activeId} wirklich löschen?
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => entferneGeschaeftNicht()}>Nein</Button>
          <Button bsStyle="primary" onClick={() => entferneGeschaeft(activeId)}>Ja</Button>
        </Modal.Footer>

      </Modal.Dialog>
    )
  }
}

export default ModalGeschaeftDelete
