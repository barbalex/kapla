'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaFristenField from '../../components/filterFields/AreaFristenField'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    name,
    label,
    tabIndex,
    values,
    change,
    blur,
    changeComparator,
  } = props
  const { filterFields } = state.geschaefte

  return {
    name,
    label,
    tabIndex,
    values,
    filterFields,
    change,
    blur,
    changeComparator,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaFristenField)
