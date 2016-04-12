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

export const PAGES_NEW_PAGE = 'PAGES_NEW_PAGE'
export function pagesNewPage() {
  return {
    type: PAGES_NEW_PAGE
  }
}

export const PAGE_ADD_GESCHAEFT = 'PAGE_ADD_GESCHAEFT'
export function pageAddGeschaeft() {
  return {
    type: PAGE_ADD_GESCHAEFT
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

export const PAGE_MOVE_GESCHAEFT_TO_NEW_PAGE = 'PAGE_MOVE_GESCHAEFT_TO_NEW_PAGE'
export function pagesMoveGeschaeftToNewPage(geschaeft) {
  return (dispatch, getState) => {
    const { pages } = getState()
    dispatch(pageRemoveGeschaeft(pages.activePageIndex, geschaeft))
    dispatch(pagesNewPage())
    dispatch(pageAddGeschaeft())
  }
}
