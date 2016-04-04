'use strict'

import getMyName from 'username'

export const GET_USERNAME = 'GET_USERNAME'
export const GOT_USERNAME = 'GOT_USERNAME'
export const DIDNT_GET_USERNAME = 'DIDNT_GET_USERNAME'

export function getUsername () {
  return {
    type: GET_USERNAME
  }
}

export function gotUsername (username) {
  return {
    type: GOT_USERNAME,
    username
  }
}

export function didntGetUsername (error) {
  return {
    type: DIDNT_GET_USERNAME,
    error
  }
}

export function fetchUsername () {
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
