'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Navbar from '../../components/navbar/Navbar'
import * as AppActions from '../../actions/app'
import * as GeschaefteActions from '../../actions/geschaefte'
import * as TableActions from '../../actions/table'

const actions = Object.assign(
  AppActions,
  GeschaefteActions,
  TableActions
)

function mapStateToProps(state) {
  const {
    filterFulltext,
    geschaefte,
    geschaefteGefilterteIds,
    willDelete
  } = state.geschaefte
  const {
    dbPath,
    db,
    showMessageModal
  } = state.app
  const {
    table,
    rows
  } = state.table
  const path = state.routing.locationBeforeTransitions.pathname
  return {
    filterFulltext,
    geschaefte,
    geschaefteGefilterteIds,
    dbPath,
    db,
    willDeleteGeschaeft: willDelete,
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
