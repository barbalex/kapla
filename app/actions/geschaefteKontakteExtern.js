'use strict'

import getGeschaefteKontakteExternFromDb from '../src/getGeschaefteKontakteExternFromDb'

export function getGeschaefteKontakteExtern() {
  return (dispatch, getState) => {
    const { app } = getState()
    dispatch(geschaefteKontakteExternGet())
    getGeschaefteKontakteExternFromDb(app.db)
      .then((geschaefteKontakteExtern) => {
        dispatch(geschaefteKontakteExternGetSuccess(geschaefteKontakteExtern))
      })
      .catch((error) => dispatch(geschaefteKontakteExternGetError(error)))
  }
}

export const GESCHAEFTE_KONTAKTE_EXTERN_GET = 'GESCHAEFTE_KONTAKTE_EXTERN_GET'
function geschaefteKontakteExternGet() {
  return {
    type: GESCHAEFTE_KONTAKTE_EXTERN_GET
  }
}

export const GESCHAEFTE_KONTAKTE_EXTERN_GET_SUCCESS = 'GESCHAEFTE_KONTAKTE_EXTERN_GET_SUCCESS'
function geschaefteKontakteExternGetSuccess(geschaefteKontakteExtern) {
  return {
    type: GESCHAEFTE_KONTAKTE_EXTERN_GET_SUCCESS,
    geschaefteKontakteExtern
  }
}

export const GESCHAEFTE_KONTAKTE_EXTERN_GET_ERROR = 'GESCHAEFTE_KONTAKTE_EXTERN_GET_ERROR'
function geschaefteKontakteExternGetError(error) {
  return {
    type: GESCHAEFTE_KONTAKTE_EXTERN_GET_ERROR,
    error
  }
}

/*
 * Geschaeft Kontakt Extern
 */

import newGeschaeftKontaktExternInDb from '../src/newGeschaeftKontaktExternInDb.js'
import deleteGeschaeftKontaktExtern from '../src/deleteGeschaeftKontaktExtern.js'

export function geschaeftKontaktExternNewCreate(idGeschaeft, idKontakt) {
  return (dispatch, getState) => {
    const { app } = getState()
    newGeschaeftKontaktExternInDb(app.db, idGeschaeft, idKontakt)
      .then((geschaeftKontaktExtern) => dispatch(geschaeftKontaktExternNew(geschaeftKontaktExtern)))
      .catch((error) => dispatch(geschaeftKontaktExternNewError(error)))
  }
}

export const GESCHAEFT_KONTAKT_EXTERN_NEW = 'GESCHAEFT_KONTAKT_EXTERN_NEW'
export function geschaeftKontaktExternNew(geschaeftKontaktExtern) {
  return {
    type: GESCHAEFT_KONTAKT_EXTERN_NEW,
    geschaeftKontaktExtern
  }
}

export const GESCHAEFT_KONTAKT_EXTERN_NEW_ERROR = 'GESCHAEFT_KONTAKT_EXTERN_NEW_ERROR'
export function geschaeftKontaktExternNewError(error) {
  return {
    type: GESCHAEFT_KONTAKT_EXTERN_NEW_ERROR,
    error
  }
}

export function geschaeftKontaktExternRemove(idGeschaeft, idKontakt) {
  return (dispatch, getState) => {
    const { app } = getState()
    deleteGeschaeftKontaktExtern(app.db, idGeschaeft, idKontakt)
      .then(() => {
        dispatch(geschaeftKontaktExternRemoveDeleteIntended(idGeschaeft, idKontakt))
        dispatch(geschaeftKontaktExternDelete(idGeschaeft, idKontakt))
      })
      .catch((error) => dispatch(geschaeftKontaktExternDeleteError(error)))
  }
}

export const GESCHAEFT_KONTAKT_EXTERN_SET_DELETE_INTENDED = 'GESCHAEFT_KONTAKT_EXTERN_SET_DELETE_INTENDED'
export function geschaeftKontaktExternSetDeleteIntended(idGeschaeft, idKontakt) {
  return {
    type: GESCHAEFT_KONTAKT_EXTERN_SET_DELETE_INTENDED,
    idGeschaeft,
    idKontakt
  }
}

export const GESCHAEFT_KONTAKT_EXTERN_REMOVE_DELETE_INTENDED = 'GESCHAEFT_KONTAKT_EXTERN_REMOVE_DELETE_INTENDED'
export function geschaeftKontaktExternRemoveDeleteIntended() {
  return {
    type: GESCHAEFT_KONTAKT_EXTERN_REMOVE_DELETE_INTENDED
  }
}

export const GESCHAEFT_KONTAKT_EXTERN_DELETE = 'GESCHAEFT_KONTAKT_EXTERN_DELETE'
export function geschaeftKontaktExternDelete(idGeschaeft, idKontakt) {
  return {
    type: GESCHAEFT_KONTAKT_EXTERN_DELETE,
    idGeschaeft,
    idKontakt
  }
}

export const GESCHAEFT_KONTAKT_EXTERN_DELETE_ERROR = 'GESCHAEFT_KONTAKT_EXTERN_DELETE_ERROR'
export function geschaeftKontaktExternDeleteError(error) {
  return {
    type: GESCHAEFT_KONTAKT_EXTERN_DELETE_ERROR,
    error
  }
}

export const GESCHAEFTE_KONTAKTE_EXTERN_CHANGE_DB_ERROR = 'GESCHAEFTE_KONTAKTE_EXTERN_CHANGE_DB_ERROR'
export function geschaefteKontakteExternChangeDbError(error) {
  // TODO: reload data from db
  return {
    type: GESCHAEFTE_KONTAKTE_EXTERN_CHANGE_DB_ERROR,
    error
  }
}
