'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pages from '../components/Pages'
import * as PagesActions from '../actions/pages'

function mapStateToProps(state) {
  const {
    pages,
    title,
    queryTitle,
    reportType,
    activePageIndex,
    remainingGeschaefte
  } = state.pages

  return {
    pages,
    title,
    queryTitle,
    reportType,
    activePageIndex,
    remainingGeschaefte
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PagesActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages)
