'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ModalMessage from '../components/ModalMessage'
import * as appActions from '../actions/app'

function mapStateToProps(state) {
  const { showMessageModal, messageText } = state.app
  return { showMessageModal, messageText }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalMessage)
