'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import KontakteInternItems from '../../components/geschaeft/KontakteInternItems'
import * as GeschaefteKontakteInternActions from '../../actions/geschaefteKontakteIntern'
import * as AppActions from '../../actions/app'

const actions = Object.assign(
  GeschaefteKontakteInternActions,
  AppActions,
)

function mapStateToProps(state) {
  const {
    geschaefteKontakteIntern,
  } = state.geschaefteKontakteIntern
  const {
    interneOptions,
    activeId,
  } = state.geschaefte

  return {
    geschaefteKontakteIntern,
    interneOptions,
    activeId,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(KontakteInternItems)
