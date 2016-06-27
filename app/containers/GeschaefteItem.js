'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaefteItem from '../components/GeschaefteItem'
import * as UserActions from '../actions/user'
import * as GeschaefteActions from '../actions/geschaefte'
import * as AppActions from '../actions/app'

const actions = Object.assign(
  GeschaefteActions,
  AppActions,
  UserActions
)

function mapStateToProps(state, props) {
  const {
    geschaefte,
    geschaefteGefilterteIds,
    activeId
  } = state.geschaefte
  const { username } = state.user
  const { dbPath, db } = state.app
  const path = state.routing.locationBeforeTransitions.pathname
  const { index, keyPassed } = props

  return {
    geschaefte,
    geschaefteGefilterteIds,
    username,
    dbPath,
    db,
    activeId,
    path,
    index,
    keyPassed
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaefteItem)
