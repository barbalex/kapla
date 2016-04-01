import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from '../components/Home'
import * as UserActions from '../actions/user'
import * as AppActions from '../actions/app'
import * as GeschaefteActions from '../actions/geschaefte'

const actions = Object.assign(UserActions, AppActions, GeschaefteActions)

function mapStateToProps (state) {
  return {
    username: state.user.username,
    dbPath: state.app.dbPath,
    db: state.app.db,
    filterFields: state.geschaefte.filterFields,
    filterFulltext: state.geschaefte.filterFulltext
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
