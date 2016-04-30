'use strict'

import {
  DB_CHOOSE,
  DB_CHOOSE_SUCCESS,
  DB_CHOOSE_ERROR,
  MESSAGE_SHOW
} from '../actions/app'

const standardState = {
  fetchingDb: false,
  errorFetchingDb: null,
  dbPath: null,
  db: null,
  showMessageModal: false,
  messageTextLine1: '',
  messageTextLine2: ''
}

export default function app(state = standardState, action) {
  switch (action.type) {
    case MESSAGE_SHOW:
      return {
        ...state,
        showMessageModal: action.showMessageModal,
        messageTextLine1: action.messageTextLine1,
        messageTextLine2: action.messageTextLine2
      }
    case DB_CHOOSE:
      return {
        ...state,
        fetchingDb: true,
        errorFetchingDb: null
      }
    case DB_CHOOSE_SUCCESS:
      return {
        ...state,
        fetchingDb: false,
        errorFetchingDb: null,
        dbPath: action.dbPath,
        db: action.db
      }
    case DB_CHOOSE_ERROR:
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
