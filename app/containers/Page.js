'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Page from '../components/Page'
import * as GeschaefteActions from '../actions/geschaefte'
import * as PagesActions from '../actions/pages'

const actions = Object.assign(GeschaefteActions, PagesActions)

function mapStateToProps(state) {
  const { geschaefte, activePageIndex } = state

  return {
    geschaefte: geschaefte.geschaefte,
    activePageIndex
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
