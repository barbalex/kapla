'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FilterFieldsLayout from '../components/FilterFieldsLayout'
import * as GeschaefteActions from '../actions/geschaefte'

function mapStateToProps(state) {
  const {
    geschaefteLayout,
    filterFieldsLayout,
    geschaefteColumnWidth
  } = state.geschaefte
  return {
    geschaefteLayout,
    filterFieldsLayout,
    geschaefteColumnWidth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterFieldsLayout)
