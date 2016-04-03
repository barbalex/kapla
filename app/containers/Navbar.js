import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import * as UserActions from '../actions/user'
import * as AppActions from '../actions/app'
import * as GeschaeftActions from '../actions/geschaeft'

const actions = Object.assign(UserActions, AppActions, GeschaeftActions)

function mapStateToProps (state) {
  return {
    username: state.user.username
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
