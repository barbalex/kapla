import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Geschaeft from '../components/Geschaeft'
import * as GeschaeftActions from '../actions/geschaeft'
import * as AppActions from '../actions/app'

const actions = Object.assign(GeschaeftActions, AppActions)

function mapStateToProps (state) {
  return {
    geschaeft: state.geschaefte.geschaefte
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Geschaeft)
