import React, { Component, PropTypes } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider'
import TableRow from '../containers/table/TableRow'
import Table from '../containers/table/Table'

class TableLayout extends Component {
  static propTypes = {
    tableLayout: PropTypes.object,
    config: PropTypes.object.isRequired,
    tableLayoutSet: PropTypes.func.isRequired,
    configSetKey: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    let { tableLayout } = this.props
    const { tableLayoutSet, config } = this.props
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
              width: config.tableColumnWidth,
            },
            {
              type: 'react-component',
              component: 'tableRow',
              title: 'Aktiver Datensatz',
            }
          ]
        }
      ]
    }
    tableLayout = new GoldenLayout(layoutConfig)
    tableLayout.registerComponent(
      'table',
      wrapComponentInProvider(Table)
    )
    tableLayout.registerComponent(
      'tableRow',
      wrapComponentInProvider(TableRow)
    )
    tableLayout.init()
    tableLayoutSet(tableLayout)
    tableLayout.on('stateChanged', () =>
      this.saveTableState()
    )
  }

  componentWillUnmount = () => {
    const { tableLayout } = this.props
    if (tableLayout.destroy) tableLayout.destroy()
  }

  saveTableState = () => {
    const { tableLayout, configSetKey } = this.props
    const config = tableLayout.toConfig()
    const tableColumnWidth = config.content[0].content[0].width
    configSetKey('tableColumnWidth', tableColumnWidth)
  }

  render = () => <div />
}

export default TableLayout
