'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NavbarOptionsNav from '../components/NavbarOptionsNav'
import * as AppActions from '../actions/app'

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarOptionsNav)
