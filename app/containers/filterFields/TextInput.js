'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TextInput from '../../components/filterFields/TextInput'
import * as GeschaefteActions from '../../actions/geschaefte'

function mapStateToProps(state, props) {
  const {
    name,
    change,
    values,
    changeComparator,
    tabIndex,
    autoFocus = false,
  } = props

  return {
    name,
    change,
    values,
    tabIndex,
    changeComparator,
    autoFocus,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TextInput)
