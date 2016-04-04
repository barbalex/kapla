import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import * as UserActions from '../actions/user'
import * as AppActions from '../actions/app'
import * as GeschaefteActions from '../actions/geschaefte'

const actions = Object.assign(UserActions, AppActions, GeschaefteActions)

function mapStateToProps (state) {
  return {
    username: state.user.username,
    geschaeft: state.geschaeft.geschaeft
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
