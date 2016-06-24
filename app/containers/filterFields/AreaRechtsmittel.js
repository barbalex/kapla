'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaRechtsmittel from '../../components/filterFields/AreaRechtsmittel'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    rechtsmittelErledigungOptions,
    rechtsmittelInstanzOptions
  } = state.geschaefte
  const {
    values,
    change,
    nrOfFieldsBeforePv,
    onChangeDatePicker
  } = props

  return {
    values,
    rechtsmittelErledigungOptions,
    rechtsmittelInstanzOptions,
    change,
    nrOfFieldsBeforePv,
    onChangeDatePicker
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaRechtsmittel)
