'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaHistory from '../../components/filterFields/AreaHistory'

function mapStateToProps(state, props) {
  const {
    values,
    change,
  } = props

  return {
    values,
    change,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaHistory)
