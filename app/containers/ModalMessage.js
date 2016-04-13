'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ModalMessage from '../components/ModalMessage'
import * as PagesActions from '../actions/pages'

function mapStateToProps(state) {
  const { activeId } = state.geschaefte
  return { activeId }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PagesActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalMessage)
