import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TableLayout from '../components/TableLayout'
import * as TableActions from '../actions/table'

function mapStateToProps(state) {
  const {
    tableLayout,
    tableColumnWidth,
  } = state.table
  return {
    tableLayout,
    tableColumnWidth,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TableActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableLayout)
