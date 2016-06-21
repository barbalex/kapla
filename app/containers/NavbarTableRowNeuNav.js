'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NavbarTableRowNeuNav from '../components/NavbarTableRowNeuNav'
import * as TableActions from '../actions/table'

function mapStateToProps(state) {
  const { table } = state.table
  return { table }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TableActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarTableRowNeuNav)
