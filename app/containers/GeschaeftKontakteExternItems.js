'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaeftKontakteExternItems from '../components/GeschaeftKontakteExternItems'
import * as GeschaefteKontakteExternActions from '../actions/geschaefteKontakteExtern'

function mapStateToProps(state) {
  const {
    geschaefteKontakteExtern,
  } = state.geschaefteKontakteExtern
  const {
    externeOptions,
    activeId
  } = state.geschaefte

  return {
    geschaefteKontakteExtern,
    externeOptions,
    activeId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GeschaefteKontakteExternActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaeftKontakteExternItems)
