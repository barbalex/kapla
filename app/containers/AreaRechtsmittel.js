'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaRechtsmittel from '../components/AreaRechtsmittel'
import * as GeschaefteActions from '../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId,
    rechtsmittelerledigungOptions
  } = state.geschaefte
  const {
    blur,
    change,
    nrOfFieldsBeforePv
  } = props
  const geschaeft = geschaefte.find((g) => g.idGeschaeft === activeId)

  return {
    geschaeft,
    rechtsmittelerledigungOptions,
    change,
    blur,
    nrOfFieldsBeforePv
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaRechtsmittel)
