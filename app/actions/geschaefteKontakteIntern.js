'use strict'

import getGeschaefteKontakteInternFromDb from '../src/getGeschaefteKontakteInternFromDb'

export function getGeschaefteKontakteIntern() {
  return (dispatch, getState) => {
    const { app } = getState()
    dispatch(geschaefteKontakteInternGet())
    getGeschaefteKontakteInternFromDb(app.db)
      .then((geschaefteKontakteIntern) => {
        dispatch(geschaefteKontakteInternGetSuccess(geschaefteKontakteIntern))
      })
      .catch((error) => dispatch(geschaefteKontakteInternGetError(error)))
  }
}

export const GESCHAEFTE_KONTAKTE_INTERN_GET = 'GESCHAEFTE_KONTAKTE_INTERN_GET'
function geschaefteKontakteInternGet() {
  return {
    type: GESCHAEFTE_KONTAKTE_INTERN_GET
  }
}

export const GESCHAEFTE_KONTAKTE_INTERN_GET_SUCCESS = 'GESCHAEFTE_KONTAKTE_INTERN_GET_SUCCESS'
function geschaefteKontakteInternGetSuccess(geschaefteKontakteIntern) {
  return {
    type: GESCHAEFTE_KONTAKTE_INTERN_GET_SUCCESS,
    geschaefteKontakteIntern
  }
}

export const GESCHAEFTE_KONTAKTE_INTERN_GET_ERROR = 'GESCHAEFTE_KONTAKTE_INTERN_GET_ERROR'
function geschaefteKontakteInternGetError(error) {
  return {
    type: GESCHAEFTE_KONTAKTE_INTERN_GET_ERROR,
    error
  }
}

/*
 * Geschaeft Kontakt Intern
 */

import newGeschaeftKontaktInternInDb from '../src/newGeschaeftKontaktInternInDb.js'
import deleteGeschaeftKontaktIntern from '../src/deleteGeschaeftKontaktIntern.js'

export function geschaeftNewCreate(idGeschaeft) {
  return (dispatch, getState) => {
    const { app } = getState()
    newGeschaeftKontaktInternInDb(app.db, idGeschaeft)
      .then((geschaeftKontaktIntern) => {
        dispatch(geschaeftKontaktInternNew(geschaeftKontaktIntern))
        dispatch(geschaeftKontaktInternToggleActivated(geschaeftKontaktIntern.idGeschaeft, geschaeftKontaktIntern.idKontakt))
      })
      .catch((error) => dispatch(geschaeftKontaktInternNewError(error)))
  }
}

export const GESCHAEFT_KONTAKT_INTERN_NEW = 'GESCHAEFT_KONTAKT_INTERN_NEW'
export function geschaeftKontaktInternNew(geschaeftKontaktIntern) {
  return {
    type: GESCHAEFT_KONTAKT_INTERN_NEW,
    geschaeftKontaktIntern
  }
}

export const GESCHAEFT_KONTAKT_INTERN_NEW_ERROR = 'GESCHAEFT_KONTAKT_INTERN_NEW_ERROR'
export function geschaeftKontaktInternNewError(error) {
  return {
    type: GESCHAEFT_KONTAKT_INTERN_NEW_ERROR,
    error
  }
}

export function geschaeftRemove(idGeschaeft, idKontakt) {
  return (dispatch, getState) => {
    const { app } = getState()
    deleteGeschaeftKontaktIntern(app.db, idGeschaeft, idKontakt)
      .then(() => {
        dispatch(geschaeftKontaktInternRemoveDeleteIntended(idGeschaeft, idKontakt))
        dispatch(geschaeftKontaktInternDelete(idGeschaeft, idKontakt))
      })
      .catch((error) => dispatch(geschaeftKontaktInternDeleteError(error)))
  }
}

export const GESCHAEFT_KONTAKT_INTERN_SET_DELETE_INTENDED = 'GESCHAEFT_KONTAKT_INTERN_SET_DELETE_INTENDED'
export function geschaeftKontaktInternSetDeleteIntended(idGeschaeft, idKontakt) {
  return {
    type: GESCHAEFT_KONTAKT_INTERN_SET_DELETE_INTENDED,
    idGeschaeft,
    idKontakt
  }
}

export const GESCHAEFT_KONTAKT_INTERN_REMOVE_DELETE_INTENDED = 'GESCHAEFT_KONTAKT_INTERN_REMOVE_DELETE_INTENDED'
export function geschaeftKontaktInternRemoveDeleteIntended() {
  return {
    type: GESCHAEFT_KONTAKT_INTERN_REMOVE_DELETE_INTENDED
  }
}

export const GESCHAEFT_KONTAKT_INTERN_DELETE = 'GESCHAEFT_KONTAKT_INTERN_DELETE'
export function geschaeftKontaktInternDelete(idGeschaeft, idKontakt) {
  return {
    type: GESCHAEFT_KONTAKT_INTERN_DELETE,
    idGeschaeft,
    idKontakt
  }
}

export const GESCHAEFT_KONTAKT_INTERN_DELETE_ERROR = 'GESCHAEFT_KONTAKT_INTERN_DELETE_ERROR'
export function geschaeftKontaktInternDeleteError(error) {
  return {
    type: GESCHAEFT_KONTAKT_INTERN_DELETE_ERROR,
    error
  }
}

export const GESCHAEFTE_KONTAKTE_INTERN_CHANGE_DB_ERROR = 'GESCHAEFTE_KONTAKTE_INTERN_CHANGE_DB_ERROR'
export function geschaefteKontakteInternChangeDbError(error) {
  // TODO: reload data from db
  return {
    type: GESCHAEFTE_KONTAKTE_INTERN_CHANGE_DB_ERROR,
    error
  }
}

export const GESCHAEFT_KONTAKT_INTERN_TOGGLE_ACTIVATED = 'GESCHAEFT_KONTAKT_INTERN_TOGGLE_ACTIVATED'
export function geschaeftKontaktInternToggleActivated(activeIdGeschaeft, activeIdKontakt) {
  return {
    type: GESCHAEFT_KONTAKT_INTERN_TOGGLE_ACTIVATED,
    activeIdGeschaeft,
    activeIdKontakt
  }
}
