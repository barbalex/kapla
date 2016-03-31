'use strict'

import {
  DB_WAEHLEN,
  DB_GEWAEHLT,
  DB_NICHT_GEWAEHLT
} from '../actions/app'

const standardState = {
  fetchingDb: false,
  errorFetchingDb: null,
  dbPath: null,
  db: null
}

export default function app (state = standardState, action) {
  switch (action.type) {
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
        errorFetchingDb: action.errorFetchingDb,
        dbPath: null,
        db: null
      })
    default:
      return state
  }
}
