'use strict'

export const PAGES_INITIATE = 'PAGES_INITIATE'
export function pagesInitiate(reportType) {
  return {
    type: PAGES_INITIATE,
    reportType
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
export function pagesNewPage(geschaefte = []) {
  return {
    type: PAGES_NEW_PAGE,
    geschaefte
  }
}

export const PAGE_ADD_GESCHAEFT = 'PAGE_ADD_GESCHAEFT'
export function pageAddGeschaeft(pageIndex, geschaeft) {
  return {
    type: PAGE_ADD_GESCHAEFT,
    pageIndex,
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
