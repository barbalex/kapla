'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FilterNav from '../../components/navbar/FilterNav'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state) {
  const {
    filterType,
    filterFulltext,
    geschaefte,
    geschaefteGefilterteIds
  } = state.geschaefte
  const { username } = state.user
  return {
    username,
    filterType,
    filterFulltext,
    geschaefte,
    geschaefteGefilterteIds
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterNav)
