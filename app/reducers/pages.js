'use strict'

import {
  PAGES_NEW_PAGE,
  PAGES_SET_TITLE,
  PAGES_INITIATE,
  PAGES_QUERY_TITLE,
  PAGE_ADD_GESCHAEFT,
  PAGE_REMOVE_GESCHAEFT
} from '../actions/pages'

const standardPagesState = {
  pages: [{ geschaefte: [] }],
  activePageIndex: 0,
  remainingGeschaefte: [],
  title: '',
  queryTitle: true,
  reportType: 'fristen'
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
          geschaefte: [...state.geschaefte, action.geschaeft],
          remainingGeschaefte: state.pages.remainingGeschaefte.filter(
            (g) => g.idGeschaeft !== action.geschaeft.idGeschaeft
          )
        }
      }
      return state
    case PAGE_REMOVE_GESCHAEFT:
      if (index === action.pageIndex) {
        return {
          ...state,
          geschaefte: state.geschaefte.filter(
            (g) => g.idGeschaeft !== action.geschaeft.idGeschaeft
          ),
          remainingGeschaefte: [action.geschaeft, ...state.geschaefte]
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
        reportType: action.reportType,
        remainingGeschaefte: action.geschaefteGefiltert
      }
    case PAGES_QUERY_TITLE:
      return {
        ...state,
        queryTitle: action.queryTitle
      }
    case PAGES_SET_TITLE:
      return {
        ...state,
        title: action.title
      }
    case PAGES_NEW_PAGE:
      return {
        ...state,
        activePageIndex: state.pages.activePageIndex + 1
      }
    case PAGE_ADD_GESCHAEFT:
    case PAGE_REMOVE_GESCHAEFT:
      return {
        ...state,
        geschaefte: state.pages.map((g, index) => page(g, action, index))
      }
    default:
      return state
  }
}
