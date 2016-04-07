'use strict'

import {
  PAGES_NEW_PAGE,
  PAGES_SET_TITLE,
  PAGES_INITIATE
} from '../actions/pages'

const standardState = {
  pages: [],
  title: 'Geschäfte',
  reportType: 'GeschaefteReport'
}

export default function pages(state = standardState, action) {
  switch (action.type) {
    case PAGES_INITIATE:
      return {
        ...standardState,
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
    default:
      return state
  }
}
