'use strict'

import {
  PAGES_NEW_PAGE,
  PAGES_SET_TITLE,
  PAGES_INITIATE,
  PAGE_ADD_GESCHAEFT,
  PAGE_REMOVE_GESCHAEFT
} from '../actions/pages'

const standardPagesState = {
  pages: [],
  title: 'Geschäfte',
  reportType: 'GeschaefteReport'
}

const standardPageState = {
  geschaefte: []
}

function page(state = standardPageState, action, index) {
  switch (action.type) {
    case PAGE_ADD_GESCHAEFT:
      if (index === action.pageIndex) {
        return {
          ...state,
          geschaefte: [...state.geschaefte, action.geschaeft]
        }
      }
      return state 
    case PAGE_REMOVE_GESCHAEFT:
      if (index === action.pageIndex) {
        return {
          ...state,
          geschaefte: state.geschaefte.filter((g) => g.idGeschaeft !== action.geschaeft.idGeschaeft)
        }
      }
      return state
    default:
      return state
  }
}

export default function pages(state = standardPagesState, action) {
  switch (action.type) {
    case PAGES_INITIATE:
      return {
        ...standardPagesState,
        reportType: action.reportType
      }
    case PAGES_SET_TITLE:
      return {
        ...state,
        title: action.title
      }
    case PAGES_NEW_PAGE:
      return {
        ...state,
        pages: [...state.pages, { geschaefte: action.geschaefte }]
      }
    case PAGE_ADD_GESCHAEFT:
      return {
        ...state,
        geschaefte: state.pages.map((g, index) => page(g, action, index))
      }
    default:
      return state
  }
}
