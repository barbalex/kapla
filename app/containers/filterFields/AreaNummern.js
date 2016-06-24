'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaNummern from '../../components/filterFields/AreaNummern'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId,
  } = state.geschaefte
  const { blur, change, wrapperClass, nrOfGFields } = props
  const geschaeft = geschaefte.find((g) =>
    g.idGeschaeft === activeId
  )

  return {
    geschaeft,
    blur,
    change,
    wrapperClass,
    nrOfGFields
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaNummern)
