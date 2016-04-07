'use strict'

import {
  PAGE_GESCHAEFT_ERGAENZEN,
  PAGE_GESCHAEFT_VERSCHIEBEN,
  PAGE_NEU,
  PAGES_TITEL_SETZEN,
  PAGES_INITIIEREN
} from '../actions/pages'

const standardState = {
  pages: [],
  title: 'Geschäfte'
}

export default function pages(state = standardState, action) {
  switch (action.type) {
    case PAGES_INITIIEREN:
      return standardState
    case PAGES_TITEL_SETZEN:
      return {
        ...state,
        title: action.title
      }
    default:
      return state
  }
}
