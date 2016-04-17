'use strict'

import {
  USERNAME_GET,
  USERNAME_GET_SUCCESS,
  USERNAME_GET_ERROR
} from '../actions/user'

const standardState = {
  fetching: false,
  error: null,
  username: null
}

export default function geschaefte(state = standardState, action) {
  switch (action.type) {
    case USERNAME_GET:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case USERNAME_GET_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        username: action.username
      }
    case USERNAME_GET_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error,
        username: null
      }
    default:
      return state
  }
}
