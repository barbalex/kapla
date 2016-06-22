'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BerichteNav from '../../components/navbar/BerichteNav'
import * as GeschaefteActions from '../../actions/geschaefte'
import * as PagesActions from '../../actions/pages'

const actions = Object.assign(
  GeschaefteActions,
  PagesActions
)

function mapStateToProps(state) {
  const { pages } = state
  const path = state.routing.locationBeforeTransitions.pathname
  return {
    path,
    pages
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BerichteNav)
