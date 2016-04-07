'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaefteReport from '../components/GeschaefteReport'
import * as GeschaefteActions from '../actions/geschaefte'
import * as PagesActions from '../actions/pages'

const actions = Object.assign(GeschaefteActions, PagesActions)

function mapStateToProps(state) {
  const { geschaefteGefiltert } = state.geschaefte
  const { pages, title, reportType } = state.pages

  return {
    geschaefteGefiltert,
    pages,
    title,
    reportType
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaefteReport)
