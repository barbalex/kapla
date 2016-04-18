'use strict'

import {
  TABELLE_GET,
  TABELLE_GET_SUCCESS,
  TABELLE_GET_ERROR,
  ROW_ACTIVATE,
  ROW_DEACTIVATE,
  ROW_DELETE,
  ROW_SET_DELETE_INTENDED,
  ROW_REMOVE_DELETE_INTENDED,
  TABELLE_CHANGE_STATE,
  TABELLE_CHANGE_DB_ERROR,
  ROW_NEW
} from '../actions/tabelle'

const standardState = {
  fetching: false,
  error: [],
  geschaefte: [],
  geschaefteGefilterteIds: [],
  filterFields: {},
  filterFulltext: '',
  // dropdown lists
  rechtsmittelerledigungOptions: [],
  parlVorstossTypOptions: [],
  statusOptions: [],
  geschaeftsartOptions: [],
  // following: state for active geschaeft
  activeId: null,
  willDelete: false
}

function geschaeft(state = {}, action) {
  switch (action.type) {
    case TABELLE_CHANGE_STATE:
      if (state.idGeschaeft !== action.idGeschaeft) {
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

export default function geschaefte(state = standardState, action) {
  switch (action.type) {
    case TABELLE_GET:
      return {
        ...state,
        fetching: true,
        error: []
      }
    case TABELLE_GET_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: [],
        geschaefte: action.geschaefte,
        geschaefteGefilterteIds: action.geschaefteGefilterteIds
      }
    case TABELLE_GET_ERROR:
      return {
        ...state,
        fetching: false,
        error: [...state.error, action.error]
      }
    case GESCHAEFTE_FILTER_BY_FIELDS:
      return {
        ...state,
        filterFields: action.filterFields,
        filterFulltext: null,
        activeId: null,
        geschaefteGefilterteIds: action.geschaefteGefilterteIds
      }
    case GESCHAEFTE_FILTER_BY_FULLTEXT_SET:
      return {
        ...state,
        filterFulltext: action.filterFulltext,
        filterFields: {},
        activeId: null
      }
    case GESCHAEFTE_FILTER_BY_FULLTEXT:
      return {
        ...state,
        geschaefteGefilterteIds: action.geschaefteGefilterteIds
      }
    case ROW_ACTIVATE:
      return {
        ...state,
        activeId: action.idGeschaeft
      }
    case ROW_DEACTIVATE:
      return {
        ...state,
        activeId: null
      }
    case ROW_SET_DELETE_INTENDED:
      return {
        ...state,
        willDelete: true
      }
    case ROW_REMOVE_DELETE_INTENDED:
      return {
        ...state,
        willDelete: false
      }
    case ROW_DELETE:
      return {
        ...state,
        geschaefte: [...state.geschaefte.filter((g) => g.idGeschaeft !== action.idGeschaeft)],
        geschaefteGefilterteIds: [...state.geschaefteGefilterteIds.filter((id) => id !== action.idGeschaeft)]
      }
    case TABELLE_CHANGE_STATE:
      return {
        ...state,
        geschaefte: state.geschaefte.map((g) => geschaeft(g, action))
      }
    case ROW_NEW:
      /**
       * need to add new id to geschaefteGefilterteIds
       */
      return {
        ...state,
        geschaefte: [action.geschaeft, ...state.geschaefte],
        geschaefteGefilterteIds: [action.geschaeft.idGeschaeft, ...state.geschaefteGefilterteIds]
      }
    case RECHTSMITTELERLEDIGUNG_OPTIONS_GET_SUCCESS:
      return {
        ...state,
        rechtsmittelerledigungOptions: action.rechtsmittelerledigungOptions
      }
    case PARLVORSTOSSTYP_OPTIONS_GET_SUCCESS:
      return {
        ...state,
        parlVorstossTypOptions: action.parlVorstossTypOptions
      }
    case STATUS_OPTIONS_GET_SUCCESS:
      return {
        ...state,
        statusOptions: action.statusOptions
      }
    case GESCHAEFTSART_OPTIONS_GET_SUCCESS:
      return {
        ...state,
        geschaeftsartOptions: action.geschaeftsartOptions
      }
    case RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR:
    case PARLVORSTOSSTYP_OPTIONS_GET_ERROR:
    case STATUS_OPTIONS_GET_ERROR:
    case GESCHAEFTSART_OPTIONS_GET_ERROR:
    case TABELLE_CHANGE_DB_ERROR:
      return {
        ...state,
        error: [...state.error, action.error]
      }
    default:
      return state
  }
}
