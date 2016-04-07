'use strict'

import {
  PAGE_ADD_GESCHAEFT,
  PAGE_REMOVE_GESCHAEFT
} from '../actions/page'

const standardState = {
  geschaefte: []
}

export default function page(state = standardState, action) {
  switch (action.type) {
    case PAGE_ADD_GESCHAEFT:
      return {
        ...state,
        geschaefte: [...state.geschaefte, action.geschaeft]
      }
    case PAGE_REMOVE_GESCHAEFT:
      return {
        ...state,
        geschaefte: state.geschaefte.filter((g) => g.idGeschaeft !== action.geschaeft.idGeschaeft)
      }
    default:
      return state
  }
}
