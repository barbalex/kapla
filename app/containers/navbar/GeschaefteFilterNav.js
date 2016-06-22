'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaefteFilterNav from '../../components/navbar/GeschaefteFilterNav'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    filterType,
    geschaefte,
    geschaefteGefilterteIds
  } = state.geschaefte
  const { username } = state.user
  const { focusFulltextFilter, removeFilter } = props
  return {
    username,
    filterType,
    geschaefte,
    geschaefteGefilterteIds,
    focusFulltextFilter,
    removeFilter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaefteFilterNav)
