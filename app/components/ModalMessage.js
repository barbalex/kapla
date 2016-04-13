'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Overlay } from 'react-bootstrap'
import styles from './ModalMessage.css'

class ModalMessage extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  render() {
    const { message } = this.props
    // const appComponent = ReactDOM.findDOMNode('app')
    const appComponent = this.refs.app

    console.log('components/ModalMessage, render, message', message)

    return (
      <Overlay show className={styles.overlay} container={appComponent} placement="bottom">
        <div className={styles.containerDiv}>
          <div className={styles.posDiv}>
            <p>{message}</p>
          </div>
        </div>
      </Overlay>
    )
  }
}

export default ModalMessage
