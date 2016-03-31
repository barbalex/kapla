import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Toolbar from '../components/Toolbar'
import * as UserActions from '../actions/user'
import * as AppActions from '../actions/app'

const actions = Object.assign(UserActions, AppActions)

function mapStateToProps (state) {
  return {
    username: state.user.username,
    db: state.app.db
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
