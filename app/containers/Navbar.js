'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import * as UserActions from '../actions/user'
import * as AppActions from '../actions/app'
import * as GeschaefteActions from '../actions/geschaefte'
import * as PagesActions from '../actions/pages'

const actions = Object.assign(UserActions, AppActions, GeschaefteActions, PagesActions)

function mapStateToProps(state) {
  const { activeId, filterFulltext, geschaefte, geschaefteGefiltert, willDelete, exportieren } = state.geschaefte
  const { username } = state.user
  const { dbPath, db, navbarVisible } = state.app
  const buildingPages = state.pages.building
  const path = state.routing.locationBeforeTransitions.pathname
  return {
    username,
    activeId,
    filterFulltext,
    geschaefte,
    geschaefteGefiltert,
    geschaefteExportieren: exportieren,
    dbPath,
    db,
    willDeleteGeschaeft: willDelete,
    navbarVisible,
    buildingPages,
    path
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
