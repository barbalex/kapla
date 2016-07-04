'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SortSelector from '../../components/filterFields/SortSelector'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    name,
  } = props
  const { filterFields } = state.geschaefte

  return {
    name,
    filterFields,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SortSelector)
