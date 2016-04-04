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
  GESCHAEFT_ENTFERNEN_WILL_NICHT
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
    default:
      return state
  }
}
