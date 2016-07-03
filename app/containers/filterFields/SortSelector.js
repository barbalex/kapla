'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SortSelector from '../../components/filterFields/SortSelector'

function mapStateToProps(state, props) {
  const {
    name,
    changeComparator,
  } = props
  const { filterFields } = state.geschaefte

  return {
    name,
    filterFields,
    changeComparator,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SortSelector)
