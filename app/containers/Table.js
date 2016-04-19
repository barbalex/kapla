'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Table from '../components/Table'
import * as TableActions from '../actions/table'

function mapStateToProps(state, props) {
  const { table, rows, id } = state.table
  const { layout } = props

  return {
    table,
    rows,
    id,
    tableLayout: layout
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TableActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
