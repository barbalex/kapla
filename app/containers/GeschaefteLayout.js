'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaefteLayout from '../components/GeschaefteLayout'
import * as AppActions from '../actions/app'

function mapStateToProps(state) {
  const {
    geschaefteLayout,
    filterFieldsLayout,
    geschaefteColumnWidth,
  } = state.app

  return {
    geschaefteLayout,
    filterFieldsLayout,
    geschaefteColumnWidth,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaefteLayout)
