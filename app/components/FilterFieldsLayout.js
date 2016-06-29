'use strict'

import React, { Component, PropTypes } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider'
import FilterFields from '../containers/filterFields/FilterFields'
import Geschaefte from '../containers/Geschaefte'
import saveConfigValue from '../src/saveConfigValue'
class FilterFieldsLayout extends Component {
  static propTypes = {
    geschaefteLayout: PropTypes.object,
    filterFieldsLayout: PropTypes.object,
    geschaefteColumnWidth: PropTypes.number.isRequired,
    filterFieldsLayoutSet: PropTypes.func.isRequired,
    geschaefteColumnSet: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    let { filterFieldsLayout } = this.props
    const { filterFieldsLayoutSet, geschaefteColumnWidth } = this.props
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
            component: 'filterFields',
            title: 'Filtern nach Feldern'
          }
        ]
      }]
    }
    filterFieldsLayout = new GoldenLayout(layoutConfig)
    filterFieldsLayout.registerComponent('geschaefte', wrapComponentInProvider(Geschaefte))
    filterFieldsLayout.registerComponent('filterFields', wrapComponentInProvider(FilterFields, filterFieldsLayout))
    filterFieldsLayout.init()
    setTimeout(() => {
      filterFieldsLayoutSet(filterFieldsLayout)
      filterFieldsLayout.on('stateChanged', () =>
        this.saveGeschaefteState()
      )
    }, 0)
  }

  componentWillUnmount = () => {
    const { filterFieldsLayout } = this.props
    filterFieldsLayout.destroy()
  }

  saveGeschaefteState = () => {
    const { filterFieldsLayout, geschaefteColumnSet, geschaefteLayout } = this.props
    const config = filterFieldsLayout.toConfig()
    const geschaefteColumnWidth = config.content[0].content[0].width
    saveConfigValue('geschaefteColumnWidth', geschaefteColumnWidth)
    geschaefteColumnSet(geschaefteColumnWidth)
    if (geschaefteLayout.destroy) geschaefteLayout.destroy()
  }

  render = () => <div></div>
}

export default FilterFieldsLayout
