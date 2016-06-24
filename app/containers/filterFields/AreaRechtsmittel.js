'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaRechtsmittel from '../../components/filterFields/AreaRechtsmittel'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId,
    rechtsmittelErledigungOptions,
    rechtsmittelInstanzOptions
  } = state.geschaefte
  const {
    blur,
    change,
    nrOfFieldsBeforePv,
    onChangeDatePicker
  } = props
  const geschaeft = geschaefte.find((g) =>
    g.idGeschaeft === activeId
  )

  return {
    geschaeft,
    rechtsmittelErledigungOptions,
    rechtsmittelInstanzOptions,
    change,
    blur,
    nrOfFieldsBeforePv,
    onChangeDatePicker
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaRechtsmittel)
