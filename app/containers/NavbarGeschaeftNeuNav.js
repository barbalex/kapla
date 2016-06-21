'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NavbarGeschaeftNeuNav from '../components/NavbarGeschaeftNeuNav'
import * as GeschaefteActions from '../actions/geschaefte'

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarGeschaeftNeuNav)
