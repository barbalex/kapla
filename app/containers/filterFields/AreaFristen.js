'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaFristen from '../../components/filterFields/AreaFristen'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    values,
    change,
    blur,
    changeComparator,
    nrOfFieldsBeforeFristen,
    onChangeDatePicker
  } = props

  return {
    values,
    change,
    blur,
    changeComparator,
    nrOfFieldsBeforeFristen,
    onChangeDatePicker
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaFristen)
