'use strict'

import React, { Component, PropTypes } from 'react'
import Navbar from '../containers/Navbar.js'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
        {/*
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools')
              return <DevTools />
            }
          })()
        */}
      </div>
    )
  }
}
