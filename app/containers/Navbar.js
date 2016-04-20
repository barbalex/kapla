'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import * as AppActions from '../actions/app'
import * as GeschaefteActions from '../actions/geschaefte'
import * as TableActions from '../actions/table'
import * as PagesActions from '../actions/pages'

const actions = Object.assign(AppActions, GeschaefteActions, TableActions, PagesActions)

function mapStateToProps(state) {
  const { activeId, filterFulltext, geschaefte, geschaefteGefilterteIds, willDelete } = state.geschaefte
  const { username } = state.user
  const { dbPath, db, navbarVisible, showMessageModal } = state.app
  const { table, rows } = state.table
  const path = state.routing.locationBeforeTransitions.pathname
  return {
    username,
    activeId,
    filterFulltext,
    geschaefte,
    geschaefteGefilterteIds,
    dbPath,
    db,
    willDeleteGeschaeft: willDelete,
    navbarVisible,
    path,
    showMessageModal,
    table,
    rows
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
