'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import OptionsNav from '../../components/navbar/OptionsNav'
import * as AppActions from '../../actions/app'

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsNav)
