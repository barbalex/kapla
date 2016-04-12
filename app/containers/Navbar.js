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
  const { activeId, filterFulltext, geschaefte, geschaefteGefiltert, willDelete } = state.geschaefte
  const { username } = state.user
  const { dbPath, db } = state.app
  const { pages } = state.pages
  return {
    username,
    activeId,
    filterFulltext,
    geschaefte,
    geschaefteGefiltert,
    dbPath,
    db,
    willDeleteGeschaeft: willDelete,
    pages
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
