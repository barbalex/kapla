'use strict'

import getMyName from 'username'

export const USERNAME_GET = 'USERNAME_GET'
export const USERNAME_GET_SUCCESS = 'USERNAME_GET_SUCCESS'
export const USERNAME_GET_ERROR = 'USERNAME_GET_ERROR'

export function getUsername() {
  return {
    type: USERNAME_GET
  }
}

export function gotUsername(username) {
  return {
    type: USERNAME_GET_SUCCESS,
    username
  }
}

export function didntGetUsername(error) {
  return {
    type: USERNAME_GET_ERROR,
    error
  }
}

export function fetchUsername() {
  return (dispatch, getState) => {
    // first check if username has not yet been gotten
    const { user } = getState()
    if (!user.username) {
      const username = getMyName.sync()
      if (username) {
        dispatch(gotUsername(username))
      } else {
        dispatch(didntGetUsername('keinen Benutzernamen erhalten'))
      }
    }
  }
}
