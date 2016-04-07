'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaefteReport from '../components/GeschaefteReport'
import * as GeschaefteActions from '../actions/geschaefte'

function mapStateToProps(state) {
  const { geschaefteGefiltert } = state.geschaefte

  return {
    geschaefteGefiltert
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaefteReport)
