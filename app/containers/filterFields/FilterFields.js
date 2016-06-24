'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FilterFields from '../../components/filterFields/FilterFields'
import * as GeschaefteActions from '../../actions/geschaefte'
import * as AppActions from '../../actions/app'

const actions = Object.assign(GeschaefteActions, AppActions)

function mapStateToProps(state, props) {
  let { filterFields } = state.geschaefte
  const { layout } = props
  const values = {}
  if (filterFields.forEach) {
    filterFields.forEach((field) => {
      values[field.field] = field.value
    })
  } else {
    filterFields = []
  }

  return {
    filterFields,
    values,
    geschaefteLayout: layout
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterFields)
