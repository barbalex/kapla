'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Page from '../components/Page'
import * as GeschaefteActions from '../actions/geschaefte'
import * as PagesActions from '../actions/pages'

const actions = Object.assign(GeschaefteActions, PagesActions)

function mapStateToProps(state, props) {
  const { pages } = state
  const { pageIndex } = props
  const { remainingGeschaefte, activePageIndex, title, queryTitle, building } = pages
  const myGeschaefte = pages.pages[pageIndex].geschaefte

  return {
    pages: pages.pages,
    geschaefte: myGeschaefte,
    full: pages.pages[pageIndex].full,
    remainingGeschaefte,
    activePageIndex,
    pageIndex,
    title,
    queryTitle,
    building
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
