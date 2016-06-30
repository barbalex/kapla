'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import KontakteExtern from '../../components/geschaeft/KontakteExtern'
import * as GeschaefteKontakteExternActions from '../../actions/geschaefteKontakteExtern'
import * as AppActions from '../../actions/app'

const actions = Object.assign(
  GeschaefteKontakteExternActions,
  AppActions,
)

function mapStateToProps(state, props) {
  const {
    geschaefteKontakteExtern,
  } = state.geschaefteKontakteExtern
  const {
    externeOptions,
    activeId,
  } = state.geschaefte
  const {
    tabIndex,
  } = props

  return {
    geschaefteKontakteExtern,
    externeOptions,
    activeId,
    tabIndex,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(KontakteExtern)
