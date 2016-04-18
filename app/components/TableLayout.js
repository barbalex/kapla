'use strict'

import React, { Component, PropTypes } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider'
import Geschaeft from '../containers/Geschaeft'
import Table from '../containers/Table'
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
    content:[
      {
        type:'react-component',
        component: 'table',
        title: 'Tabelle'
      },
      {
        type:'react-component',
        component: 'geschaeft',
        title: 'Aktives Geschäft'
      }
    ]
  }]
}

class TableLayout extends Component {

  state = {
    tableLayout: null
  }

  componentDidMount = () => {
    const savedState = getConfig().tableLayoutState
    let tableLayout
    if (savedState) {
      tableLayout = new GoldenLayout(JSON.parse(savedState))
    } else {
      tableLayout = new GoldenLayout(layoutConfig)
    }
    tableLayout.registerComponent('table', wrapComponentInProvider(Table))
    tableLayout.registerComponent('geschaeft', wrapComponentInProvider(Geschaeft))
    tableLayout.init()
    this.setState({ tableLayout })
    tableLayout.on('stateChanged', () => this.saveGeschaefteState())
  }

  componentWillUnmount = () => {
    const { tableLayout } = this.state
    tableLayout.destroy()
  }

  saveGeschaefteState = () => {
    const { tableLayout } = this.state
    const state = JSON.stringify(tableLayout.toConfig())
    saveConfigValue('tableLayoutState', state)
  }

  render = () => <div></div>
}

export default TableLayout
