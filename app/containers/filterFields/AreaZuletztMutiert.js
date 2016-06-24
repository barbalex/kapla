'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaZuletztMutiert from '../../components/filterFields/AreaZuletztMutiert'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const { interneOptions } = state.geschaefte
  const { values } = props

  return {
    values,
    interneOptions
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaZuletztMutiert)
