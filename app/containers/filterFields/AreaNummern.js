'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaNummern from '../../components/filterFields/AreaNummern'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    values,
    change,
    wrapperClass,
    nrOfGFields,
  } = props

  return {
    values,
    change,
    wrapperClass,
    nrOfGFields,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaNummern)
