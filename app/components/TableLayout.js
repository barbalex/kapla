'use strict'

import React, { Component, PropTypes } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider'
import TableRow from '../containers/table/TableRow'
import Table from '../containers/table/Table'
import saveConfigValue from '../src/saveConfigValue'

class TableLayout extends Component {
  static propTypes = {
    tableLayout: PropTypes.object,
    tableColumnWidth: PropTypes.number.isRequired,
    tableLayoutSet: PropTypes.func.isRequired,
    tableColumnSet: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    let { tableLayout } = this.props
    const { tableLayoutSet, tableColumnWidth } = this.props
    const layoutConfig = {
      settings: {
        hasHeaders: false
      },
      content: [
        {
          type: 'row',
          content: [
            {
              type: 'react-component',
              component: 'table',
              title: 'Tabelle',
              width: tableColumnWidth
            },
            {
              type: 'react-component',
              component: 'tableRow',
              title: 'Aktiver Datensatz'
            }
          ]
        }
      ]
    }
    tableLayout = new GoldenLayout(layoutConfig)
    tableLayout.registerComponent('table', wrapComponentInProvider(Table))
    tableLayout.registerComponent('tableRow', wrapComponentInProvider(TableRow))
    tableLayout.init()
    tableLayoutSet(tableLayout)
    tableLayout.on('stateChanged', () =>
      this.saveTableState()
    )
  }

  componentWillUnmount = () => {
    const { tableLayout } = this.props
    tableLayout.destroy()
  }

  saveTableState = () => {
    const { tableLayout, tableColumnSet } = this.props
    const config = tableLayout.toConfig()
    const tableColumnWidth = config.content[0].content[0].width
    saveConfigValue('tableColumnWidth', tableColumnWidth)
    tableColumnSet(tableColumnWidth)
  }

  render = () => <div></div>
}

export default TableLayout
