'use strict'

import {
  DB_WAEHLEN,
  DB_GEWAEHLT,
  DB_NICHT_GEWAEHLT,
  NAVBAR_HIDE,
  NAVBAR_SHOW
} from '../actions/app'

const standardState = {
  fetchingDb: false,
  errorFetchingDb: null,
  dbPath: null,
  db: null,
  navbarVisible: true
}

export default function app(state = standardState, action) {
  switch (action.type) {
    case NAVBAR_SHOW:
      return Object.assign({}, state, {
        navbarVisible: true
      })
    case NAVBAR_HIDE:
      return Object.assign({}, state, {
        navbarVisible: false
      })
    case DB_WAEHLEN:
      return Object.assign({}, state, {
        fetchingDb: true,
        errorFetchingDb: null
      })
    case DB_GEWAEHLT:
      return Object.assign({}, state, {
        fetchingDb: false,
        errorFetchingDb: null,
        dbPath: action.dbPath,
        db: action.db
      })
    case DB_NICHT_GEWAEHLT:
      return Object.assign({}, state, {
        fetchingDb: false,
        errorFetchingDb: action.error,
        dbPath: null,
        db: null
      })
    default:
      return state
  }
}
