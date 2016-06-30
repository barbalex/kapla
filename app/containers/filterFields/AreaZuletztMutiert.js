'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaZuletztMutiert from '../../components/filterFields/AreaZuletztMutiert'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    interneOptions,
  } = state.geschaefte
  const {
    values,
    change,
    nrOfFieldsBeforeZuletztMutiert,
    changeComparator,
  } = props

  return {
    values,
    interneOptions,
    change,
    nrOfFieldsBeforeZuletztMutiert,
    changeComparator,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaZuletztMutiert)
