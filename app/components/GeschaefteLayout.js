'use strict'

import React, { Component, PropTypes } from 'react'
const GoldenLayout = require('imports?React=react&ReactDOM=react-dom!golden-layout')
import Geschaeft from '../containers/Geschaeft'
import Geschaefte from '../containers/Geschaefte'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaefteLayoutComponent from '../components/GeschaefteLayout'
import * as UserActions from '../actions/user'
import * as GeschaefteActions from '../actions/geschaefte'
import * as AppActions from '../actions/app'

class GeschaefteLayout extends Component {
  static propTypes = {
    fetchUsername: PropTypes.func.isRequired,
    holeDbAusConfig: PropTypes.func.isRequired,
    holenGeschaefte: PropTypes.func.isRequired,
    holenRechtsmittelerledigungOptions: PropTypes.func.isRequired,
    holenParlVorstossTypOptions: PropTypes.func.isRequired,
    holenStatusOptions: PropTypes.func.isRequired,
    holenGeschaeftsartOptions: PropTypes.func.isRequired
  }

  componentWillMount = () => {
    const {
      fetchUsername,
      holeDbAusConfig,
      holenGeschaefte,
      holenRechtsmittelerledigungOptions,
      holenParlVorstossTypOptions,
      holenStatusOptions,
      holenGeschaeftsartOptions
    } = this.props

    fetchUsername()
    holeDbAusConfig()
    holenGeschaefte()
    holenRechtsmittelerledigungOptions()
    holenParlVorstossTypOptions()
    holenStatusOptions()
    holenGeschaeftsartOptions()
  }

  geschaefteConstructor = () => {
    const actions = Object.assign(GeschaefteActions, AppActions, UserActions)

    function mapStateToProps(state) {
      const { geschaefte, geschaefteGefiltert, activeId } = state.geschaefte
      const { username } = state.user
      const { dbPath, db } = state.app

      return {
        geschaefte,
        geschaefteGefiltert,
        username,
        dbPath,
        db,
        activeId
      }
    }

    function mapDispatchToProps(dispatch) {
      return bindActionCreators(actions, dispatch)
    }

    return connect(mapStateToProps, mapDispatchToProps)(GeschaefteLayoutComponent)
  }
  geschaeftConstructor = () => <Geschaeft />

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
    console.log('components/GeschaefteLayout, this', this)
    const layoutConfig = {
      content: [{
        type: 'row',
        content:[{
          type:'react-component',
          component: 'geschaefte'
        },{
          type:'react-component',
          component: 'geschaeft'
        }]
      }]
    }
    const geschaefteLayout = new GoldenLayout(layoutConfig)

    // geschaefteLayout.registerComponent('geschaefte', this.geschaefteConstructor)
    // geschaefteLayout.registerComponent('geschaeft', this.geschaeftConstructor)
    geschaefteLayout.registerComponent('geschaefte', TestComponent)
    geschaefteLayout.registerComponent('geschaeft', TestComponent2)
    geschaefteLayout.init()
  }

  render = () => <div></div>
}

export default GeschaefteLayout
