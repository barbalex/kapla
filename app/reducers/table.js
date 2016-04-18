'use strict'

import {
  TABLE_GET,
  TABLE_GET_SUCCESS,
  TABLE_GET_ERROR,
  TABLE_ROW_ACTIVATE,
  TABLE_ROW_DEACTIVATE,
  TABLE_ROW_DELETE,
  TABLE_ROW_SET_DELETE_INTENDED,
  TABLE_ROW_REMOVE_DELETE_INTENDED,
  TABLE_CHANGE_STATE,
  TABLE_CHANGE_DB_ERROR,
  TABLE_ROW_NEW
} from '../actions/table'

const standardState = {
  table: null,
  rows: [],
  fetching: false,
  // following: state for active row
  id: null,
  willDelete: false
}

function row(state = {}, action) {
  switch (action.type) {
    case TABLE_CHANGE_STATE:
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        [action.field]: action.value
      }
    default:
      return state
  }
}

export default function table(state = standardState, action) {
  switch (action.type) {
    case TABLE_GET:
      return {
        ...state,
        fetching: true,
        error: []
      }
    case TABLE_GET_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: [],
        rows: action.rows
      }
    case TABLE_ROW_ACTIVATE:
      return {
        ...state,
        id: action.id
      }
    case TABLE_ROW_DEACTIVATE:
      return {
        ...state,
        id: null
      }
    case TABLE_ROW_SET_DELETE_INTENDED:
      return {
        ...state,
        willDelete: true
      }
    case TABLE_ROW_REMOVE_DELETE_INTENDED:
      return {
        ...state,
        willDelete: false
      }
    case TABLE_ROW_DELETE:
      return {
        ...state,
        rows: [...state.rows.filter((g) => g.id !== action.id)]
      }
    case TABLE_CHANGE_STATE:
      return {
        ...state,
        rows: state.rows.map((g) => row(g, action))
      }
    case TABLE_ROW_NEW:
      /**
       * need to add new id to geschaefteGefilterteIds
       */
      return {
        ...state,
        rows: [action.row, ...state.rows]
      }
    case TABLE_GET_ERROR:
    case TABLE_CHANGE_DB_ERROR:
      return {
        ...state,
        fetching: false,
        error: [...state.error, action.error]
      }
    default:
      return state
  }
}
