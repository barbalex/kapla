'use strict'

import React, { Component, PropTypes } from 'react'
import GoldenLayout from 'golden-layout'
import wrapComponentInProvider from '../containers/wrapComponentInProvider.js'
import Geschaeft from '../containers/Geschaeft'
import Geschaefte from '../containers/Geschaefte'

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

class GeschaefteLayout extends Component {

  state = {
    geschaefteLayout: null
  }

  componentDidMount = () => {
    const geschaefteLayout = new GoldenLayout(layoutConfig)
    geschaefteLayout.registerComponent('geschaefte', wrapComponentInProvider(Geschaefte))
    geschaefteLayout.registerComponent('geschaeft', wrapComponentInProvider(Geschaeft))
    geschaefteLayout.init()
    this.setState({
      geschaefteLayout: geschaefteLayout
    })
  }

  componentWillUnmount = () => {
    const { geschaefteLayout } = this.state
    geschaefteLayout.destroy()
  }

  render = () => {
    return (<div></div>)
  }
}

export default GeschaefteLayout
