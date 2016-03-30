import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from '../components/Home'
import * as UserActions from '../actions/user'

function mapStateToProps (state) {
  return {
    username: state.user.username
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(UserActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
