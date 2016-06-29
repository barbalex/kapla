import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TableLayout from '../components/TableLayout'
import * as AppActions from '../actions/app'

function mapStateToProps(state) {
  const {
    tableLayout,
    config,
  } = state.app
  return {
    tableLayout,
    config,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableLayout)
