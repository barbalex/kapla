'use strict'

import {
  GESCHAEFT_BESTELLEN,
  GESCHAEFT_ERHALTEN,
  GESCHAEFT_NICHT_ERHALTEN,
  GESCHAEFT_ENTFERNEN_WILL,
  GESCHAEFT_ENTFERNEN_WILL_NICHT
} from '../actions/geschaeft'

const standardState = {
  fetching: false,
  error: null,
  geschaeft: {},
  willDelete: false
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
    case GESCHAEFT_ENTFERNEN_WILL:
      return Object.assign({}, state, {
        willDelete: true
      })
    case GESCHAEFT_ENTFERNEN_WILL_NICHT:
      return Object.assign({}, state, {
        willDelete: false
      })
    default:
      return state
  }
}
