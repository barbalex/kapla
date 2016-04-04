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
  GESCHAEFT_EROEFFNEN
} from '../actions/geschaefte'

const standardState = {
  fetching: false,
  error: null,
  geschaefte: [],
  filterFields: {},
  filterFulltext: null,
  // following: state for active geschaeft
  activeId: null,
  willDelete: false
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
        error: null
      })
    case GESCHAEFTE_ERHALTEN:
      return Object.assign({}, state, {
        fetching: false,
        error: null,
        geschaefte: action.geschaefte
      })
    case GESCHAEFTE_NICHT_ERHALTEN:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
        geschaefte: []
      })
    case GESCHAEFTE_FILTERN_FELDER:
      return Object.assign({}, state, {
        filterFields: action.filter,
        filterFulltext: null
      })
    case GESCHAEFTE_FILTERN_VOLLTEXT:
      return Object.assign({}, state, {
        filterFields: {},
        filterFulltext: action.filter
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
    default:
      return state
  }
}
