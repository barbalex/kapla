'use strict'

import {
  DB_WAEHLEN,
  DB_GEWAEHLT,
  DB_NICHT_GEWAEHLT,
  NAVBAR_HIDE,
  NAVBAR_SHOW,
  SHOW_MESSAGE
} from '../actions/app'

const standardState = {
  fetchingDb: false,
  errorFetchingDb: null,
  dbPath: null,
  db: null,
  navbarVisible: true,
  showMessageModal: false,
  messageText: null
}

export default function app(state = standardState, action) {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        showMessageModal: action.showMessageModal,
        messageText: action.messageText
      }
    case NAVBAR_SHOW:
      return {
        ...state,
        navbarVisible: true
      }
    case NAVBAR_HIDE:
      return {
        ...state,
        navbarVisible: false
      }
    case DB_WAEHLEN:
      return {
        ...state,
        fetchingDb: true,
        errorFetchingDb: null
      }
    case DB_GEWAEHLT:
      return {
        ...state,
        fetchingDb: false,
        errorFetchingDb: null,
        dbPath: action.dbPath,
        db: action.db
      }
    case DB_NICHT_GEWAEHLT:
      return {
        ...state,
        fetchingDb: false,
        errorFetchingDb: action.error,
        dbPath: null,
        db: null
      }
    default:
      return state
  }
}
