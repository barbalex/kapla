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

function page(state, action, pageIndex) {
  // console.log('reducers/pages, page, state', state)
  // console.log('reducers/pages, page, action', action)
  // console.log('reducers/pages, page, pageIndex', pageIndex)
  switch (action.type) {
    case PAGE_ADD_GESCHAEFT:
      if (pageIndex === action.pageIndex) {
        const geschaefte = [...state.geschaefte, action.geschaeft]
        return { ...state, geschaefte }
      }
      return state
    case PAGE_REMOVE_GESCHAEFT:
      if (pageIndex === action.pageIndex) {
        const geschaefte = state.geschaefte.filter(
          (g) => g.idGeschaeft !== action.geschaeft.idGeschaeft
        )
        // console.log('reducers/pages/PAGE_REMOVE_GESCHAEFT, state.geschaefte.length', state.geschaefte.length)
        // console.log('reducers/pages/PAGE_REMOVE_GESCHAEFT, new geschaefte.length', geschaefte.length)
        return { ...state, geschaefte }
      }
      return state
    default:
      return state
  }
}

export default function pages(state = standardPagesState, action) {
  // console.log('reducers/pages, pages, state', state)
  // console.log('reducers/pages, pages, action', action)
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
        activePageIndex: state.pages.activePageIndex + 1,
        pages: [...state.pages, { geschaefte: [] }]
      }
    case PAGE_ADD_GESCHAEFT:
      return {
        ...state,
        pages: state.pages.map((p, pageIndex) => page(p, action, pageIndex)),
        remainingGeschaefte: state.remainingGeschaefte.filter(
          (g) => g.idGeschaeft !== action.geschaeft.idGeschaeft
        ),
        pageIndex: action.pageIndex + 1
      }
    case PAGE_REMOVE_GESCHAEFT:
      return {
        ...state,
        pages: state.pages.map((p, pageIndex) => page(p, action, pageIndex)),
        remainingGeschaefte: [action.geschaeft, ...state.remainingGeschaefte]
      }
    default:
      return state
  }
}
