'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaPersonen from '../components/AreaPersonen'
import * as GeschaefteActions from '../actions/geschaefte'
import * as AppActions from '../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions)

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId,
    interneOptions,
  } = state.geschaefte
  const { blur, change, nrOfFieldsBeforePersonen } = props
  const geschaeft = geschaefte.find((g) => g.idGeschaeft === activeId)

  return {
    geschaeft,
    activeId,
    interneOptions,
    change,
    blur,
    nrOfFieldsBeforePersonen
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaPersonen)
