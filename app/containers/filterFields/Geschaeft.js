'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Geschaeft from '../../components/filterFields/Geschaeft'
import * as GeschaefteActions from '../../actions/geschaefte'
import * as AppActions from '../../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions)

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId
  } = state.geschaefte
  const { layout } = props
  const geschaeft = geschaefte.find((g) =>
    g.idGeschaeft === activeId
  )

  return {
    geschaeft,
    activeId,
    geschaefteLayout: layout
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Geschaeft)
