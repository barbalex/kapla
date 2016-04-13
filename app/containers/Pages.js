'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pages from '../components/Pages'
import * as PagesActions from '../actions/pages'

function mapStateToProps(state) {
  const { pages, building } = state.pages

  return { pages, building }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PagesActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages)
