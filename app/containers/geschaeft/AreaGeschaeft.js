'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AreaGeschaeft from '../../components/geschaeft/AreaGeschaeft'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    geschaefte,
    activeId,
    statusOptions,
    geschaeftsartOptions
  } = state.geschaefte
  const {
    blur,
    change,
    wrapperClass,
    nrOfNrFields
  } = props
  const geschaeft = geschaefte.find((g) =>
    g.idGeschaeft === activeId
  )

  return {
    geschaeft,
    statusOptions,
    geschaeftsartOptions,
    change,
    blur,
    wrapperClass,
    nrOfNrFields
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaGeschaeft)
