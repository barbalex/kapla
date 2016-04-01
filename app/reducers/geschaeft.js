'use strict'

import {
  GESCHAEFT_BESTELLEN,
  GESCHAEFT_ERHALTEN,
  GESCHAEFT_NICHT_ERHALTEN
} from '../actions/geschaeft'

const standardState = {
  fetching: false,
  error: null,
  geschaeft: {}
}

export default function geschaeft (state = standardState, action) {
  switch (action.type) {
    case GESCHAEFT_BESTELLEN:
      return Object.assign({}, state, {
        fetching: true,
        error: null
      })
    case GESCHAEFT_ERHALTEN:
      return Object.assign({}, state, {
        fetching: false,
        error: null,
        geschaeft: action.geschaeft
      })
    case GESCHAEFT_NICHT_ERHALTEN:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
        geschaeft: {}
      })
    default:
      return state
  }
}
