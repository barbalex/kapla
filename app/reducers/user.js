'use strict'

import {
  GET_USERNAME,
  GOT_USERNAME,
  DIDNT_GET_USERNAME
} from '../actions/user'

const standardState = {
  fetching: false,
  error: null,
  username: null
}

export default function geschaefte(state = standardState, action) {
  switch (action.type) {
    case GET_USERNAME:
      return Object.assign({}, state, {
        fetching: true,
        error: null
      })
    case GOT_USERNAME:
      return Object.assign({}, state, {
        fetching: false,
        error: null,
        username: action.username
      })
    case DIDNT_GET_USERNAME:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
        username: null
      })
    default:
      return state
  }
}
