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
    interneOptions,
    externeOptions,
    statusOptions,
    geschaeftsartOptions
  } = state.geschaefte
  const { layout } = props
  const geschaeft = geschaefte.find((g) => g.idGeschaeft === activeId)

  return {
    geschaeft,
    activeId,
    rechtsmittelerledigungOptions,
    parlVorstossTypOptions,
    interneOptions,
    externeOptions,
    statusOptions,
    geschaeftsartOptions,
    geschaefteLayout: layout
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Geschaeft)
