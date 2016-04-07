'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pages from '../components/Pages'
import * as GeschaefteActions from '../actions/geschaefte'
import * as PagesActions from '../actions/pages'

const actions = Object.assign(GeschaefteActions, PagesActions)

function mapStateToProps(state) {
  const { geschaefte, activePageIndex } = state

  return { geschaefte, activePageIndex }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages)
