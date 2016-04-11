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
  const { remainingGeschaefte, activePageIndex, title, queryTitle } = pages
  const myGeschaefte = pages.pages[pageIndex].geschaefte

  console.log('containers/Pages, pages state', pages)

  return {
    geschaefte: myGeschaefte,
    remainingGeschaefte,
    activePageIndex,
    pageIndex,
    title,
    queryTitle
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
