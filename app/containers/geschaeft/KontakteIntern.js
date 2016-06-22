'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import KontakteIntern from '../../components/geschaeft/KontakteIntern'
import * as GeschaefteKontakteInternActions from '../../actions/geschaefteKontakteIntern'
import * as AppActions from '../../actions/app'

const actions = Object.assign(
  GeschaefteKontakteInternActions,
  AppActions
)

function mapStateToProps(state, props) {
  const {
    geschaefteKontakteIntern,
    activeIdGeschaeft,
    activeIdKontakt
  } = state.geschaefteKontakteIntern
  const {
    interneOptions,
    activeId
  } = state.geschaefte
  const { tabIndex } = props

  return {
    geschaefteKontakteIntern,
    activeIdGeschaeft,
    activeIdKontakt,
    interneOptions,
    activeId,
    tabIndex
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(KontakteIntern)
