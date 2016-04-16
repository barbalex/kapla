'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Geschaefte from '../components/Geschaefte'
import * as UserActions from '../actions/user'
import * as GeschaefteActions from '../actions/geschaefte'
import * as AppActions from '../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions, UserActions)

  

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default function(goldenLayoutProps) {
  console.log('containers/Geschaefte, props', props)

  function mapStateToProps(state, goldenLayoutProps) {
    const { geschaefte, geschaefteGefiltert, activeId } = state.geschaefte
    const { username } = state.user
    const { dbPath, db } = state.app

    const geschaefteProps = {
      geschaefte,
      geschaefteGefiltert,
      username,
      dbPath,
      db,
      activeId
    }

    console.log('containers/Geschaefte, geschaefteProps', geschaefteProps)

    return Object.assign(geschaefteProps, goldenLayoutProps)
  }
  return connect(mapStateToProps, mapDispatchToProps)(Geschaefte)
}
