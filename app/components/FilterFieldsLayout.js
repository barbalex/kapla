'use strict'

import React, { Component } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider'
import FilterFields from '../containers/filterFields/FilterFields'
import Geschaefte from '../containers/Geschaefte'
import saveConfigValue from '../src/saveConfigValue'
import getConfig from '../src/getConfig.js'

class FilterFieldsLayout extends Component {
  state = {
    filterFieldsLayout: null
  }

  componentDidMount = () => {
    let { filterFieldsLayout } = this.state
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
            component: 'filterFields',
            title: 'Filtern nach Feldern'
          }
        ]
      }]
    }
    const savedState = getConfig().filterFieldsLayoutState
    if (savedState) {
      filterFieldsLayout = new GoldenLayout(savedState)
    } else {
      filterFieldsLayout = new GoldenLayout(layoutConfig)
    }
    filterFieldsLayout.registerComponent('geschaefte', wrapComponentInProvider(Geschaefte))
    filterFieldsLayout.registerComponent('filterFields', wrapComponentInProvider(FilterFields, filterFieldsLayout))
    filterFieldsLayout.init()
    this.setState({ filterFieldsLayout })
    filterFieldsLayout.on('stateChanged', () =>
      this.saveGeschaefteState()
    )
  }

  componentWillUnmount = () => {
    const { filterFieldsLayout } = this.state
    filterFieldsLayout.destroy()
  }

  saveGeschaefteState = () => {
    const { filterFieldsLayout } = this.state
    saveConfigValue('filterFieldsLayoutState', filterFieldsLayout.toConfig())
  }

  render = () => <div></div>
}

export default FilterFieldsLayout
