'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Geschaeft from '../components/Geschaeft'
import * as GeschaefteActions from '../actions/geschaefte'
import * as AppActions from '../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions)

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId,
    rechtsmittelerledigungOptions,
    parlVorstossTypOptions,
    statusOptions,
    geschaeftsartOptions
  } = state.geschaefte
  const { layout } = props

  return {
    geschaefte,
    activeId,
    rechtsmittelerledigungOptions,
    parlVorstossTypOptions,
    statusOptions,
    geschaeftsartOptions,
    geschaefteLayout: layout
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Geschaeft)
