'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaParlVorstoss from '../components/AreaParlVorstoss'
import * as GeschaefteActions from '../actions/geschaefte'
import * as AppActions from '../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions)

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId,
    parlVorstossTypOptions
  } = state.geschaefte
  const { blur, change, nrOfFieldsBeforePv } = props
  const geschaeft = geschaefte.find((g) => g.idGeschaeft === activeId)

  return {
    geschaeft,
    parlVorstossTypOptions,
    change,
    blur,
    nrOfFieldsBeforePv
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaParlVorstoss)
