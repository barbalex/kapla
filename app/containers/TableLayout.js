import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TableLayout from '../components/TableLayout'
import * as AppActions from '../actions/app'

function mapStateToProps(state) {
  const {
    tableLayout,
    tableColumnWidth,
  } = state.app
  return {
    tableLayout,
    tableColumnWidth,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableLayout)
