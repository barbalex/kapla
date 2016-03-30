'use strict'

import username from 'username'

export const GET_USERNAME = 'GET_USERNAME'
export const GOT_USERNAME = 'GOT_USERNAME'
export const DIDNT_GET_USERNAME = 'GOT_USERNAME'

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
  return dispatch => {
    username
      .then((username) => dispatch(gotUsername(username)))
      .catch((error) => dispatch(didntGetUsername(error)))
  }
}
