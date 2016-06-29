'use strict'

import React, { Component, PropTypes } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider'
import Geschaeft from '../containers/geschaeft/Geschaeft'
import Geschaefte from '../containers/Geschaefte'
import saveConfigValue from '../src/saveConfigValue'

class GeschaefteLayout extends Component {
  static propTypes = {
    geschaefteLayout: PropTypes.object,
    filterFieldsLayout: PropTypes.object,
    geschaefteColumnWidth: PropTypes.number.isRequired,
    geschaefteLayoutSet: PropTypes.func.isRequired,
    geschaefteColumnSet: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    let { geschaefteLayout } = this.props
    const { geschaefteLayoutSet, geschaefteColumnWidth } = this.props
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
            width: geschaefteColumnWidth
          },
          {
            type: 'react-component',
            component: 'geschaeft',
            title: 'aktives Geschäft'
          }
        ]
      }]
    }
    geschaefteLayout = new GoldenLayout(layoutConfig)
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
    const { geschaefteLayout, geschaefteColumnSet, filterFieldsLayout } = this.props
    const config = geschaefteLayout.toConfig()
    const geschaefteColumnWidth = config.content[0].content[0].width
    saveConfigValue('geschaefteColumnWidth', geschaefteColumnWidth)
    geschaefteColumnSet(geschaefteColumnWidth)
    if (filterFieldsLayout.destroy) filterFieldsLayout.destroy()
  }

  render = () => <div></div>
}

export default GeschaefteLayout
