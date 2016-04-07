'use strict'

export const PAGE_ADD_GESCHAEFT = 'PAGE_ADD_GESCHAEFT'
export function pageAddGeschaeft(geschaeft) {
  return {
    type: PAGE_ADD_GESCHAEFT,
    geschaeft
  }
}

export const PAGE_REMOVE_GESCHAEFT = 'PAGE_REMOVE_GESCHAEFT'
export function pageRemoveGeschaeft(geschaeft) {
  return {
    type: PAGE_REMOVE_GESCHAEFT,
    geschaeft
  }
}
