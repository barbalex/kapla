'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaHistoryRows from '../../components/filterFields/AreaHistoryRows'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const { values } = props

  return { values }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaHistoryRows)
