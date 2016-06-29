'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaefteLayout from '../components/GeschaefteLayout'
import * as GeschaefteActions from '../actions/geschaefte'

function mapStateToProps(state) {
  const {
    geschaefteLayout
  } = state.geschaefte
  return {
    geschaefteLayout
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaefteLayout)
