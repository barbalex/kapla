'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FilterFieldsLayout from '../components/FilterFieldsLayout'
import * as AppActions from '../actions/app'

function mapStateToProps(state) {
  const {
    geschaefteLayout,
    filterFieldsLayout,
    geschaefteColumnWidth
  } = state.app
  return {
    geschaefteLayout,
    filterFieldsLayout,
    geschaefteColumnWidth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterFieldsLayout)
