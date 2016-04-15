'use strict'

import {
  GESCHAEFTE_BESTELLEN,
  GESCHAEFTE_ERHALTEN,
  GESCHAEFTE_NICHT_ERHALTEN,
  GESCHAEFTE_FILTERN_FELDER,
  GESCHAEFTE_VOLLTEXTFILTER_SETZEN,
  GESCHAEFTE_FILTERN_VOLLTEXT,
  GESCHAEFT_AKTIVIEREN,
  GESCHAEFT_DEAKTIVIEREN,
  GESCHAEFT_ENTFERNEN_WILL,
  GESCHAEFT_ENTFERNEN_WILL_NICHT,
  GESCHAEFTE_AENDERN_STATE,
  GESCHAEFT_AENDERN_DB_FEHLER,
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
  geschaefteGefiltert: [],
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
    case GESCHAEFTE_AENDERN_STATE:
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
    case GESCHAEFTE_BESTELLEN:
      return {
        ...state,
        fetching: true,
        error: []
      }
    case GESCHAEFTE_ERHALTEN:
      return {
        ...state,
        fetching: false,
        error: [],
        geschaefte: action.geschaefte,
        geschaefteGefiltert: action.geschaefteGefiltert
      }
    case GESCHAEFTE_NICHT_ERHALTEN:
      return {
        ...state,
        fetching: false,
        error: [...state.error, action.error]
      }
    case GESCHAEFTE_FILTERN_FELDER:
      return {
        ...state,
        filterFields: action.filterFields,
        filterFulltext: null,
        activeId: null,
        geschaefteGefiltert: action.geschaefteGefiltert
      }
    case GESCHAEFTE_VOLLTEXTFILTER_SETZEN:
      return {
        ...state,
        filterFulltext: action.filterFulltext,
        filterFields: {},
        activeId: null
      }
    case GESCHAEFTE_FILTERN_VOLLTEXT:
      return {
        ...state,
        geschaefteGefiltert: action.geschaefteGefiltert
      }
    case GESCHAEFT_AKTIVIEREN:
      return {
        ...state,
        activeId: action.idGeschaeft
      }
    case GESCHAEFT_DEAKTIVIEREN:
      return {
        ...state,
        activeId: null
      }
    case GESCHAEFT_ENTFERNEN_WILL:
      return {
        ...state,
        willDelete: true
      }
    case GESCHAEFT_ENTFERNEN_WILL_NICHT:
      return {
        ...state,
        willDelete: false
      }
    case GESCHAEFTE_AENDERN_STATE:
      return {
        ...state,
        geschaefte: state.geschaefte.map((g) => geschaeft(g, action))
      }
    case GESCHAEFT_EROEFFNEN:
      return {
        ...state,
        geschaefte: [{ idGeschaeft: action.idGeschaeft }, ...state.geschaefte]
      }
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
    case GESCHAEFT_AENDERN_DB_FEHLER:
      return {
        ...state,
        error: [...state.error, action.error]
      }
    default:
      return state
  }
}
