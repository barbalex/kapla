'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaVernehmlassung from '../components/AreaVernehmlassung'
import * as GeschaefteActions from '../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId,
    statusVernehmlassungOptions
  } = state.geschaefte
  const {
    blur,
    change,
    nrOfFieldsBeforePv
  } = props
  const geschaeft = geschaefte.find((g) => g.idGeschaeft === activeId)

  return {
    geschaeft,
    statusVernehmlassungOptions,
    change,
    blur,
    nrOfFieldsBeforePv
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaVernehmlassung)
