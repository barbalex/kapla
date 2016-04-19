'use strict'

import React, { Component } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider'
import Geschaeft from '../containers/Geschaeft'
import Geschaefte from '../containers/Geschaefte'
import saveConfigValue from '../src/saveConfigValue'
import getConfig from '../src/getConfig.js'

const layoutConfig = {
  settings: {
    hasHeaders: false,
    reorderEnabled: false,
    showPopoutIcon: false,
    showCloseIcon: false
  },
  labels: {
    maximise: 'Breite maximieren',
    minimise: 'Breite zurücksetzen'
  },
  content: [{
    type: 'row',
    content: [
      {
        type: 'react-component',
        component: 'geschaefte',
        title: 'Geschäfte'
      },
      {
        type: 'react-component',
        component: 'geschaeft',
        title: 'Aktives Geschäft'
      }
    ]
  }]
}

class GeschaefteLayout extends Component {

  state = {
    geschaefteLayout: null
  }

  componentDidMount = () => {
    const savedState = getConfig().geschaefteLayoutState
    let geschaefteLayout
    if (savedState) {
      geschaefteLayout = new GoldenLayout(savedState)
    } else {
      geschaefteLayout = new GoldenLayout(layoutConfig)
    }
    geschaefteLayout.registerComponent('geschaefte', wrapComponentInProvider(Geschaefte))
    geschaefteLayout.registerComponent('geschaeft', wrapComponentInProvider(Geschaeft))
    geschaefteLayout.init()
    this.setState({ geschaefteLayout })
    geschaefteLayout.on('stateChanged', () => this.saveGeschaefteState())
  }

  componentWillUnmount = () => {
    const { geschaefteLayout } = this.state
    geschaefteLayout.destroy()
  }

  saveGeschaefteState = () => {
    const { geschaefteLayout } = this.state
    saveConfigValue('geschaefteLayoutState', geschaefteLayout.toConfig())
  }

  render = () => <div></div>
}

export default GeschaefteLayout
