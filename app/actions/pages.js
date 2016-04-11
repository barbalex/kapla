'use strict'

import { push } from 'react-router-redux'

export const PAGES_INITIATE = 'PAGES_INITIATE'
export function pagesInitiate(reportType) {
  return (dispatch, getState) => {
    const { geschaefte } = getState()
    const { geschaefteGefiltert } = geschaefte
    dispatch({
      type: PAGES_INITIATE,
      reportType,
      geschaefteGefiltert
    })
    dispatch(push('/pages'))
  }
}

export const PAGES_QUERY_TITLE = 'PAGES_QUERY_TITLE'
export function pagesQueryTitle(queryTitle) {
  return {
    type: PAGES_QUERY_TITLE,
    queryTitle
  }
}

export const PAGES_SET_TITLE = 'PAGES_SET_TITLE'
export function pagesSetTitle(title) {
  return {
    type: PAGES_SET_TITLE,
    title
  }
}

export const PAGES_NEW_PAGE_WITH_GESCHAEFT = 'PAGES_NEW_PAGE_WITH_GESCHAEFT'
export function pagesNewPage() {
  return {
    type: PAGES_NEW_PAGE_WITH_GESCHAEFT
  }
}

export const PAGE_ADD_GESCHAEFT = 'PAGE_ADD_GESCHAEFT'
export function pageAddGeschaeft(geschaeft) {
  return {
    type: PAGE_ADD_GESCHAEFT,
    geschaeft
  }
}

export const PAGE_REMOVE_GESCHAEFT = 'PAGE_REMOVE_GESCHAEFT'
export function pageRemoveGeschaeft(pageIndex, geschaeft) {
  return {
    type: PAGE_REMOVE_GESCHAEFT,
    pageIndex,
    geschaeft
  }
}
