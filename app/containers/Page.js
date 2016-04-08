'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Page from '../components/Page'
import * as GeschaefteActions from '../actions/geschaefte'
import * as PagesActions from '../actions/pages'

const actions = Object.assign(GeschaefteActions, PagesActions)

function mapStateToProps(state, props) {
  console.log('containers/Page, state', state)
  const { pages } = state
  const { index } = props
  const { remainingGeschaefte, activePageIndex } = pages
  const myPages = pages.pages
  const myGeschaefte = myPages.geschaefte

  return {
    geschaefte: myGeschaefte,
    remainingGeschaefte,
    activePageIndex,
    index
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
