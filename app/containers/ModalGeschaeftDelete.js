import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ModalGeschaeftDelete from '../components/ModalGeschaeftDelete'
import * as GeschaeftActions from '../actions/geschaeft'

function mapStateToProps (state) {
  return {
    geschaeft: state.geschaeft.geschaeft
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(GeschaeftActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalGeschaeftDelete)
