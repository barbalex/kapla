'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ModalPagesTitle from '../components/ModalPagesTitle'
import * as actions from '../actions/pages'

function mapStateToProps(state) {
  const { title } = state.pages
  return { title }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPagesTitle)
