'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Geschaeft from '../../components/geschaeft/Geschaeft'
import * as GeschaefteActions from '../../actions/geschaefte'
import * as AppActions from '../../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions)

function mapStateToProps(state) {
  const {
    geschaefte,
    activeId,
  } = state.geschaefte
  const {
    geschaefteColumnWidth,
  } = state.app
  const geschaeft = geschaefte.find((g) =>
    g.idGeschaeft === activeId
  )

  return {
    geschaeft,
    activeId,
    geschaefteColumnWidth,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Geschaeft)
