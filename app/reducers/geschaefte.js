'use strict'

import {
  GESCHAEFTE_BESTELLEN,
  GESCHAEFTE_ERHALTEN,
  GESCHAEFTE_NICHT_ERHALTEN,
  GESCHAEFTE_FILTERN_FELDER,
  GESCHAEFTE_FILTERN_VOLLTEXT,
  GESCHAEFT_AKTIVIEREN,
  GESCHAEFT_DEAKTIVIEREN,
  GESCHAEFT_ENTFERNEN_WILL,
  GESCHAEFT_ENTFERNEN_WILL_NICHT,
  GESCHAEFTE_AENDERN,
  GESCHAEFT_EROEFFNEN,
  RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN,
  RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN_FEHLER,
  PARLVORSTOSSTYP_OPTIONS_HOLEN,
  PARLVORSTOSSTYP_OPTIONS_HOLEN_FEHLER,
  STATUS_OPTIONS_HOLEN,
  STATUS_OPTIONS_HOLEN_FEHLER,
  GESCHAEFTSART_OPTIONS_HOLEN,
  GESCHAEFTSART_OPTIONS_HOLEN_FEHLER
} from '../actions/geschaefte'

const standardState = {
  fetching: false,
  error: [],
  geschaefte: [],
  filterFields: {},
  filterFulltext: null,
  // following: state for active geschaeft
  activeId: null,
  willDelete: false,
  rechtsmittelerledigungOptions: [],
  parlVorstossTypOptions: [],
  statusOptions: [],
  geschaeftsartOptions: []
}

function geschaeft (state = {}, action) {
  switch (action.type) {
    case GESCHAEFTE_AENDERN:
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

export default function geschaefte (state = standardState, action) {
  switch (action.type) {
    case GESCHAEFTE_BESTELLEN:
      return Object.assign({}, state, {
        fetching: true,
        error: []
      })
    case GESCHAEFTE_ERHALTEN:
      return Object.assign({}, state, {
        fetching: false,
        error: [],
        geschaefte: action.geschaefte
      })
    case GESCHAEFTE_NICHT_ERHALTEN:
      return Object.assign({}, state, {
        fetching: false,
        error: [...state.error, action.error],
        geschaefte: []
      })
    case GESCHAEFTE_FILTERN_FELDER:
      return Object.assign({}, state, {
        filterFields: action.filter,
        filterFulltext: null,
        activeId: null
      })
    case GESCHAEFTE_FILTERN_VOLLTEXT:
      return Object.assign({}, state, {
        filterFields: {},
        filterFulltext: action.filter,
        activeId: null
      })
    case GESCHAEFT_AKTIVIEREN:
      return Object.assign({}, state, {
        activeId: action.idGeschaeft
      })
    case GESCHAEFT_DEAKTIVIEREN:
      return Object.assign({}, state, {
        activeId: null
      })
    case GESCHAEFT_ENTFERNEN_WILL:
      return Object.assign({}, state, {
        willDelete: true
      })
    case GESCHAEFT_ENTFERNEN_WILL_NICHT:
      return Object.assign({}, state, {
        willDelete: false
      })
    case GESCHAEFTE_AENDERN:
      return {
        ...state,
        geschaefte: state.geschaefte.map((g) => geschaeft(g, action))
      }
    case GESCHAEFT_EROEFFNEN:
      return Object.assign({}, state, {
        geschaefte: [{idGeschaeft: action.idGeschaeft}, ...state.geschaefte]
      })
    case RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN:
      return {
        ...state,
        rechtsmittelerledigungOptions: action.rechtsmittelerledigungOptions
      }
    case PARLVORSTOSSTYP_OPTIONS_HOLEN:
      return {
        ...state,
        parlVorstossTypOptions: action.parlVorstossTypOptions
      }
    case STATUS_OPTIONS_HOLEN:
      return {
        ...state,
        statusOptions: action.statusOptions
      }
    case GESCHAEFTSART_OPTIONS_HOLEN:
      return {
        ...state,
        geschaeftsartOptions: action.geschaeftsartOptions
      }
    case RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN_FEHLER:
    case PARLVORSTOSSTYP_OPTIONS_HOLEN_FEHLER:
    case STATUS_OPTIONS_HOLEN_FEHLER:
    case GESCHAEFTSART_OPTIONS_HOLEN_FEHLER:
      return {
        ...state,
        error: [...state.error, action.error]
      }
    default:
      return state
  }
}
