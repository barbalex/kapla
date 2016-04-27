'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaeftKontakteExtern from '../components/GeschaeftKontakteExtern'
import * as GeschaefteKontakteExternActions from '../actions/geschaefteKontakteExtern'
import * as AppActions from '../actions/app'

const actions = Object.assign(GeschaefteKontakteExternActions, AppActions)

function mapStateToProps(state) {
  const {
    geschaefteKontakteExtern,
    activeIdGeschaeft,
    activeIdKontakt
  } = state.geschaefteKontakteExtern
  const { externeOptions, activeId } = state.geschaefte

  return {
    geschaefteKontakteExtern,
    activeIdGeschaeft,
    activeIdKontakt,
    externeOptions,
    activeId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaeftKontakteExtern)
