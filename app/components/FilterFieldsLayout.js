import React, { Component, PropTypes } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider'
import FilterFields from '../containers/filterFields/FilterFields'
import Geschaefte from '../containers/Geschaefte'

class FilterFieldsLayout extends Component {
  static propTypes = {
    geschaefteLayout: PropTypes.object,
    filterFieldsLayout: PropTypes.object,
    config: PropTypes.object.isRequired,
    filterFieldsLayoutSet: PropTypes.func.isRequired,
    configSetKey: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    let { filterFieldsLayout } = this.props
    const { filterFieldsLayoutSet, config } = this.props
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
            component: 'filterFields',
            title: 'Filtern nach Feldern',
          }
        ]
      }]
    }
    filterFieldsLayout = new GoldenLayout(layoutConfig)
    filterFieldsLayout.registerComponent(
      'geschaefte',
      wrapComponentInProvider(Geschaefte)
    )
    filterFieldsLayout.registerComponent(
      'filterFields',
      wrapComponentInProvider(FilterFields)
    )
    filterFieldsLayout.init()
    filterFieldsLayoutSet(filterFieldsLayout)
    filterFieldsLayout.on('stateChanged', () =>
      this.saveGeschaefteState()
    )
  }

  componentWillUnmount = () => {
    const { filterFieldsLayout } = this.props
    if (filterFieldsLayout.destroy) {
      filterFieldsLayout.destroy()
    }
  }

  saveGeschaefteState = () => {
    const {
      filterFieldsLayout,
      configSetKey,
      geschaefteLayout,
    } = this.props
    const config = filterFieldsLayout.toConfig()
    const geschaefteColumnWidth = config.content[0].content[0].width
    configSetKey('geschaefteColumnWidth', geschaefteColumnWidth)
    if (geschaefteLayout.destroy) {
      geschaefteLayout.destroy()
    }
  }

  render = () => <div />
}

export default FilterFieldsLayout
