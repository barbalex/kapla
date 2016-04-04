import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Geschaeft from '../components/Geschaeft'
import * as GeschaefteActions from '../actions/geschaefte'
import * as AppActions from '../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions)

function mapStateToProps (state) {
  return {
    geschaeft: state.geschaeft.geschaeft
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Geschaeft)
