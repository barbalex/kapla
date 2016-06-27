'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Geschaefte from '../components/Geschaefte'

function mapStateToProps(state) {
  const {
    geschaefteGefilterteIds,
    geschaefteListOverflowing
  } = state.geschaefte
  return {
    geschaefteGefilterteIds,
    geschaefteListOverflowing
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Geschaefte)
