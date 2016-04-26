'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GeschaeftKontakteIntern from '../components/GeschaeftKontakteIntern'
import * as GeschaefteKontakteInternActions from '../actions/geschaefteKontakteIntern'
import * as AppActions from '../actions/app'

const actions = Object.assign(GeschaefteKontakteInternActions, AppActions)

function mapStateToProps(state) {
  const {
    geschaefteKontakteIntern,
    activeIdGeschaeft,
    activeIdKontakt
  } = state.geschaefte

  return {
    geschaefteKontakteIntern,
    activeIdGeschaeft,
    activeIdKontakt
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GeschaeftKontakteIntern)
