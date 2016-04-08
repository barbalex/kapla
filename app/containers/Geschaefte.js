'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Geschaefte from '../components/Geschaefte'
import * as UserActions from '../actions/user'
import * as GeschaefteActions from '../actions/geschaefte'
import * as AppActions from '../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions, UserActions)

function mapStateToProps(state, props) {
  const { geschaefte, geschaefteGefiltert, activeId } = state.geschaefte
  const { username } = state.user
  const { dbPath, db } = state.app
  const { children } = props

  return {
    children,
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

export default connect(mapStateToProps, mapDispatchToProps)(Geschaefte)
