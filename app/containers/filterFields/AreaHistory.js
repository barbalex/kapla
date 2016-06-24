'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaHistory from '../../components/filterFields/AreaHistory'
import * as GeschaefteActions from '../../actions/geschaefte'
import * as AppActions from '../../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions)

function mapStateToProps(state, props) {
  const { values, change } = props

  return {
    values,
    change
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaHistory)
