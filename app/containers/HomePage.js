import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from '../components/Home'
import * as UserActions from '../actions/user'
import * as AppActions from '../actions/app'

const actions = Object.assign(UserActions, AppActions)

function mapStateToProps (state) {
  return {
    username: state.user.username,
    dbPath: state.app.dbPath,
    db: state.app.db
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
