import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Geschaefte from '../components/Geschaefte'
import * as UserActions from '../actions/user'
import * as GeschaefteActions from '../actions/geschaefte'
import * as AppActions from '../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions, UserActions)

function mapStateToProps (state) {
  return {
    geschaefte: state.geschaefte.geschaefte,
    username: state.user.username,
    dbPath: state.app.dbPath,
    db: state.app.db,
    activeId: state.geschaefte.activeId,
    willDeleteGeschaeft: state.geschaefte.willDelete
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Geschaefte)
