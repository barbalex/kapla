'use strict'

import React, { Component } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider'
import Geschaeft from '../containers/Geschaeft'
import Table from '../containers/Table'
import saveConfigValue from '../src/saveConfigValue'
import getConfig from '../src/getConfig.js'

class TableLayout extends Component {

  state = {
    tableLayout: null
  }

  componentDidMount = () => {
    let { tableLayout } = this.state
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
      content: [
        {
          type: 'row',
          content: [
            {
              type: 'react-component',
              component: 'table',
              title: 'Tabelle'
            },
            {
              type: 'react-component',
              component: 'geschaeft',
              title: 'Aktives Geschäft'
            }
          ]
        }
      ]
    }
    const savedState = getConfig().tableLayoutState
    if (savedState) {
      tableLayout = new GoldenLayout(savedState)
    } else {
      tableLayout = new GoldenLayout(layoutConfig)
    }
    tableLayout.registerComponent('table', wrapComponentInProvider(Table, tableLayout))
    tableLayout.registerComponent('geschaeft', wrapComponentInProvider(Geschaeft))
    tableLayout.init()
    this.setState({ tableLayout })
    tableLayout.on('stateChanged', () => this.saveTableState())
  }

  componentWillUnmount = () => {
    const { tableLayout } = this.state
    tableLayout.destroy()
  }

  saveTableState = () => {
    const { tableLayout } = this.state
    saveConfigValue('tableLayoutState', tableLayout.toConfig())
  }

  render = () => <div></div>
}

export default TableLayout
