import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../components/Counter'
import * as GeschaefteActions from '../actions/geschaefte'

function mapStateToProps (state) {
  return {
    geschaefte: state.geschaefte
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
