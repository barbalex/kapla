'use strict'

import React, { Component, PropTypes } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider.js'
import Geschaeft from '../containers/Geschaeft'
import Geschaefte from '../containers/Geschaefte'

class GeschaefteLayout extends Component {

  componentDidMount = () => {
    const TestComponent = React.createClass({
        render: function() {
            return (<h1>test component 1</h1>)
        }
    })
    const layoutConfig = {
      settings: {
        hasHeaders: true,
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
            component: 'geschaefte',
            title: 'Geschäfte'
          },
          {
            type:'react-component',
            component: 'geschaeft',
            title: 'Aktives Geschäft'
          }
        ]
      }]
    }
    const geschaefteLayout = new GoldenLayout(layoutConfig)

    geschaefteLayout.registerComponent('geschaefte', wrapComponentInProvider(Geschaefte))
    geschaefteLayout.registerComponent('geschaeft', wrapComponentInProvider(Geschaeft))
    geschaefteLayout.init()
  }

  render = () => <div></div>
}

export default GeschaefteLayout
