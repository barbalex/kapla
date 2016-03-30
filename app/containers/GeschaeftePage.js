import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Geschaefte from '../components/Geschaefte'
import * as GeschaefteActions from '../actions/geschaefte'

function mapStateToProps (state) {
  return {
    geschaefte: state.geschaefte.geschaefte,
    filterFields: state.geschaefte.filterFields,
    filterFulltext: state.geschaefte.filterFulltext
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(GeschaefteActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Geschaefte)
