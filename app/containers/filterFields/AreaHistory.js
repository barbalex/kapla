'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaHistory from '../../components/filterFields/AreaHistory'

function mapStateToProps(state, props) {
  const {
    values,
    change,
    changeComparator,
    nrOfFieldsBeforeHistory,
  } = props

  return {
    values,
    change,
    changeComparator,
    nrOfFieldsBeforeHistory,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaHistory)
