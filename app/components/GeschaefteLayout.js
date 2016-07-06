'use strict'

import React, { Component, PropTypes } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider'
import Geschaeft from '../containers/geschaeft/Geschaeft'
import Geschaefte from '../containers/Geschaefte'

class GeschaefteLayout extends Component {
  static propTypes = {
    geschaefteLayout: PropTypes.object,
    filterFieldsLayout: PropTypes.object,
    config: PropTypes.object.isRequired,
    geschaefteLayoutSet: PropTypes.func.isRequired,
    configSetKey: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
  }

  componentDidMount = () => {
    const { path } = this.props
    if (
      path === '/geschaefte' ||
      path === '/'
    ) {
      let { geschaefteLayout } = this.props
      const { geschaefteLayoutSet, config } = this.props
      const layoutConfig = {
        settings: {
          hasHeaders: false
        },
        content: [{
          type: 'row',
          content: [
            {
              type: 'react-component',
              component: 'geschaefte',
              title: 'Geschäfte',
              width: config.geschaefteColumnWidth,
            },
            {
              type: 'react-component',
              component: 'geschaeft',
              title: 'aktives Geschäft',
            }
          ]
        }]
      }
      geschaefteLayout = new GoldenLayout(layoutConfig)
      geschaefteLayout.registerComponent(
        'geschaefte',
        wrapComponentInProvider(Geschaefte)
      )
      geschaefteLayout.registerComponent(
        'geschaeft',
        wrapComponentInProvider(Geschaeft)
      )
      geschaefteLayout.init()
      geschaefteLayoutSet(geschaefteLayout)
      geschaefteLayout.on('stateChanged', () =>
        this.saveGeschaefteState()
      )
    }
  }

  componentWillUnmount = () => {
    const { geschaefteLayout } = this.props
    if (geschaefteLayout.destroy) {
      geschaefteLayout.destroy()
    }
  }

  saveGeschaefteState = () => {
    const {
      geschaefteLayout,
      configSetKey,
      filterFieldsLayout,
    } = this.props
    const config = geschaefteLayout.toConfig()
    const geschaefteColumnWidth = config.content[0].content[0].width
    configSetKey('geschaefteColumnWidth', geschaefteColumnWidth)
    if (filterFieldsLayout.destroy) {
      filterFieldsLayout.destroy()
    }
  }

  render = () => {
    const { path } = this.props
    if (
      path === '/geschaefte' ||
      path === '/'
    ) {
      return (<div></div>)
    }
    return null
  }
}

export default GeschaefteLayout
