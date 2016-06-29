'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaefteLayout from '../components/GeschaefteLayout'
import * as AppActions from '../actions/app'

function mapStateToProps(state) {
  const {
    geschaefteLayout,
    filterFieldsLayout,
    config,
  } = state.app

  return {
    geschaefteLayout,
    filterFieldsLayout,
    config,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaefteLayout)
