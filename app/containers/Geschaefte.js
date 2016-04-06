import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Geschaefte from '../components/Geschaefte'
import * as UserActions from '../actions/user'
import * as GeschaefteActions from '../actions/geschaefte'
import * as AppActions from '../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions, UserActions)

function mapStateToProps (state) {
  const { geschaefte, geschaefteGefiltert, activeId, willDelete } = state.geschaefte
  const { username } = state.user
  const { dbPath, db } = state.app

  return {
    geschaefte,
    geschaefteGefiltert,
    username,
    dbPath,
    db,
    activeId,
    willDeleteGeschaeft: willDelete
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Geschaefte)
