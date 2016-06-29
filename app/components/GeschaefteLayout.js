'use strict'

import React, { Component, PropTypes } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider'
import Geschaeft from '../containers/geschaeft/Geschaeft'
import Geschaefte from '../containers/Geschaefte'
import saveConfigValue from '../src/saveConfigValue'
import getConfig from '../src/getConfig.js'

class GeschaefteLayout extends Component {
  static propTypes = {
    geschaefteLayout: PropTypes.object,
    geschaefteLayoutSet: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    let { geschaefteLayout } = this.props
    const { geschaefteLayoutSet } = this.props
    const layoutConfig = {
      settings: {
        hasHeaders: false,
        reorderEnabled: false,
        showPopoutIcon: false,
        showCloseIcon: false,
        showMaximiseIcon: false
      },
      labels: {
        maximise: 'Breite maximieren',
        minimise: 'Breite zurücksetzen'
      },
      content: [{
        type: 'row',
        isClosable: false,
        reorderEnabled: false,
        content: [
          {
            type: 'react-component',
            component: 'geschaefte',
            title: 'Geschäfte'
          },
          {
            type: 'react-component',
            component: 'geschaeft',
            title: 'aktives Geschäft',
            isClosable: false,
            reorderEnabled: false
          }
        ]
      }]
    }
    const savedState = getConfig().geschaefteLayoutState
    if (savedState) {
      geschaefteLayout = new GoldenLayout(savedState)
    } else {
      geschaefteLayout = new GoldenLayout(layoutConfig)
    }
    geschaefteLayout.registerComponent('geschaefte', wrapComponentInProvider(Geschaefte))
    geschaefteLayout.registerComponent('geschaeft', wrapComponentInProvider(Geschaeft, geschaefteLayout))
    geschaefteLayout.init()
    setTimeout(() => {
      geschaefteLayoutSet(geschaefteLayout)
      geschaefteLayout.on('stateChanged', () =>
        this.saveGeschaefteState()
      )
    }, 0)
  }

  componentWillUnmount = () => {
    const { geschaefteLayout } = this.props
    geschaefteLayout.destroy()
  }

  saveGeschaefteState = () => {
    const { geschaefteLayout } = this.props
    saveConfigValue('geschaefteLayoutState', geschaefteLayout.toConfig())
  }

  render = () => <div></div>
}

export default GeschaefteLayout
