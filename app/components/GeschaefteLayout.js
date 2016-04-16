'use strict'

import React, { Component, PropTypes } from 'react'
import GoldenLayout from 'golden-layout'
import Geschaeft from '../containers/Geschaeft'
import Geschaefte from '../containers/Geschaefte'

class GeschaefteLayout extends Component {

  geschaefteConstructor = () => <Geschaefte />
  geschaeftConstructor = () => <Geschaeft goldenLayoutProps={props} />

  componentDidMount = () => {
    const TestComponent = React.createClass({
        render: function() {
            return (<h1>test component 1</h1>)
        }
    })

    const TestComponent2 = React.createClass({
        render: function() {
            return (<h1>test component 2</h1>)
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
    console.log('components/GeschaefteLayout, geschaefteLayout', geschaefteLayout)

    geschaefteLayout.registerComponent('geschaefte', this.geschaefteConstructor)
    // geschaefteLayout.registerComponent('geschaeft', this.geschaeftConstructor)
    // geschaefteLayout.registerComponent('geschaefte', TestComponent)
    geschaefteLayout.registerComponent('geschaeft', TestComponent2)
    geschaefteLayout.init()
  }

  render = () => <div></div>
}

export default GeschaefteLayout
