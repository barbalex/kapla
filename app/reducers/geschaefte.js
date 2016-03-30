'use strict'

import {
  GESCHAEFTE_BESTELLEN,
  GESCHAEFTE_ERHALTEN,
  GESCHAEFTE_NICHT_ERHALTEN,
  GESCHAEFTE_FILTERN_FELDER,
  GESCHAEFTE_FILTERN_VOLLTEXT
} from '../actions/geschaefte'

const standardState = {
  fetching: false,
  error: null,
  geschaefte: [],
  filterFields: {},
  filterFulltext: null
}

export default function geschaefte (state = standardState, action) {
  switch (action.type) {
    case GESCHAEFTE_BESTELLEN:
      return Object.assign({}, state, {
        fetching: true,
        error: null
      })
    case GESCHAEFTE_ERHALTEN:
      return Object.assign({}, state, {
        fetching: false,
        error: null,
        geschaefte: action.geschaefte
      })
    case GESCHAEFTE_NICHT_ERHALTEN:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
        geschaefte: []
      })
    case GESCHAEFTE_FILTERN_FELDER:
      return Object.assign({}, state, {
        filterFields: action.filter,
        filterFulltext: null
      })
    case GESCHAEFTE_FILTERN_VOLLTEXT:
      return Object.assign({}, state, {
        filterFields: {},
        filterFulltext: action.filter
      })
    default:
      return state
  }
}
