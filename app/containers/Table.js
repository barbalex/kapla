'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Table from '../components/Table'
import * as TableActions from '../actions/table'

function mapStateToProps(state) {
  const { rows, id } = state.table

  return {
    rows,
    id
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TableActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
