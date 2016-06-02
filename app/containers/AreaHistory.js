'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaHistory from '../components/AreaHistory'
import * as GeschaefteActions from '../actions/geschaefte'
import * as AppActions from '../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions)

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId
  } = state.geschaefte
  const { blur, change } = props
  const geschaeft = geschaefte.find((g) =>
    g.idGeschaeft === activeId
  )

  return {
    geschaefte,
    geschaeft,
    activeId,
    change,
    blur
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaHistory)
