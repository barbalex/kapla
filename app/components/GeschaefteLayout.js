'use strict'

import React, { Component, PropTypes } from 'react'
import GoldenLayout from 'golden-layout'
import Geschaeft from '../containers/Geschaeft'
import Geschaefte from '../containers/Geschaefte'
import { store } from '../index.js'
import { Provider } from 'react-redux'

class GeschaefteLayout extends Component {

  geschaefteConstructor = () => (
    <Provider store={store}>
      <Geschaefte />
    </Provider>
  )

  componentDidMount = () => {
    console.log('components/GeschaefteLayout, componentDidMount, this', this)
    const TestComponent = React.createClass({
        render: function() {
            return (<h1>test component 1</h1>)
        }
    })
    const layoutConfig = {
      content: [{
        type: 'row',
        content:[
          {
            type:'react-component',
            component: 'geschaefte'
          },
          {
            type:'react-component',
            component: 'geschaeft'
          }
        ]
      }]
    }
    const geschaefteLayout = new GoldenLayout(layoutConfig)

    geschaefteLayout.registerComponent('geschaefte', this.geschaefteConstructor)
    // geschaefteLayout.registerComponent('geschaefte', TestComponent)
    geschaefteLayout.registerComponent('geschaeft', TestComponent)
    geschaefteLayout.init()
  }

  render = () => <div></div>
}

export default GeschaefteLayout
