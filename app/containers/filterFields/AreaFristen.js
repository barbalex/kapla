'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaFristen from '../../components/filterFields/AreaFristen'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId
  } = state.geschaefte
  const {
    blur,
    change,
    nrOfFieldsBeforeFristen,
    onChangeDatePicker
  } = props
  const geschaeft = geschaefte.find((g) =>
    g.idGeschaeft === activeId
  )

  return {
    geschaeft,
    change,
    blur,
    nrOfFieldsBeforeFristen,
    onChangeDatePicker
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaFristen)
