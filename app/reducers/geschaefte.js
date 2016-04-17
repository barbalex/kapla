'use strict'

import {
  GESCHAEFTE_GET,
  GESCHAEFTE_GET_SUCCESS,
  GESCHAEFTE_GET_ERROR,
  GESCHAEFTE_FILTER_BY_FIELDS,
  GESCHAEFTE_FILTER_BY_FULLTEXT,
  GESCHAEFTE_FILTER_BY_FULLTEXT_SET,
  GESCHAEFT_ACTIVATE,
  GESCHAEFT_DEACTIVATE,
  GESCHAEFT_DELETE,
  GESCHAEFT_SET_DELETE_INTENDED,
  GESCHAEFT_REMOVE_DELETE_INTENDED,
  GESCHAEFTE_CHANGE_STATE,
  GESCHAEFTE_CHANGE_DB_ERROR,
  GESCHAEFT_NEW,
  RECHTSMITTELERLEDIGUNG_OPTIONS_GET,
  RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR,
  PARLVORSTOSSTYP_OPTIONS_GET,
  PARLVORSTOSSTYP_OPTIONS_GET_ERROR,
  STATUS_OPTIONS_GET,
  STATUS_OPTIONS_GET_ERROR,
  GESCHAEFTSART_OPTIONS_GET,
  GESCHAEFTSART_OPTIONS_GET_ERROR
} from '../actions/geschaefte'

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
    case GESCHAEFTE_CHANGE_STATE:
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
    case GESCHAEFTE_GET:
      return {
        ...state,
        fetching: true,
        error: []
      }
    case GESCHAEFTE_GET_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: [],
        geschaefte: action.geschaefte,
        geschaefteGefilterteIds: action.geschaefteGefilterteIds
      }
    case GESCHAEFTE_GET_ERROR:
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
    case GESCHAEFT_ACTIVATE:
      return {
        ...state,
        activeId: action.idGeschaeft
      }
    case GESCHAEFT_DEACTIVATE:
      return {
        ...state,
        activeId: null
      }
    case GESCHAEFT_SET_DELETE_INTENDED:
      return {
        ...state,
        willDelete: true
      }
    case GESCHAEFT_REMOVE_DELETE_INTENDED:
      return {
        ...state,
        willDelete: false
      }
    case GESCHAEFT_DELETE:
      return {
        ...state,
        geschaefte: [...state.geschaefte.filter((g) => g.idGeschaeft !== action.idGeschaeft)],
        geschaefteGefilterteIds: [...state.geschaefteGefilterteIds.filter((id) => id !== action.idGeschaeft)]
      }
    case GESCHAEFTE_CHANGE_STATE:
      return {
        ...state,
        geschaefte: state.geschaefte.map((g) => geschaeft(g, action))
      }
    case GESCHAEFT_NEW:
      /**
       * need to add new id to geschaefteGefilterteIds
       */
      return {
        ...state,
        geschaefte: [action.geschaeft, ...state.geschaefte],
        geschaefteGefilterteIds: [action.geschaeft.idGeschaeft, ...state.geschaefteGefilterteIds]
      }
    case RECHTSMITTELERLEDIGUNG_OPTIONS_GET:
      return {
        ...state,
        rechtsmittelerledigungOptions: action.rechtsmittelerledigungOptions
      }
    case PARLVORSTOSSTYP_OPTIONS_GET:
      return {
        ...state,
        parlVorstossTypOptions: action.parlVorstossTypOptions
      }
    case STATUS_OPTIONS_GET:
      return {
        ...state,
        statusOptions: action.statusOptions
      }
    case GESCHAEFTSART_OPTIONS_GET:
      return {
        ...state,
        geschaeftsartOptions: action.geschaeftsartOptions
      }
    case RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR:
    case PARLVORSTOSSTYP_OPTIONS_GET_ERROR:
    case STATUS_OPTIONS_GET_ERROR:
    case GESCHAEFTSART_OPTIONS_GET_ERROR:
    case GESCHAEFTE_CHANGE_DB_ERROR:
      return {
        ...state,
        error: [...state.error, action.error]
      }
    default:
      return state
  }
}
