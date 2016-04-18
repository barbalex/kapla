'use strict'

// this line produced error
// see: https://github.com/mapbox/node-sqlite3/issues/621
// see: https://github.com/mapbox/node-pre-gyp/pull/187
// solve with: http://verysimple.com/2015/05/30/using-node_sqlite3-with-electron/
import getTabelleFromDb from '../src/getTabelleFromDb.js'
import updateGeschaeft from '../src/updateGeschaeft.js'
import filterGeschaefte from '../src/filterGeschaefte.js'

export function getTabelle() {
  return (dispatch, getState) => {
    const { app, routing } = getState()
    dispatch(tabelleGet())
    getTabelleFromDb(app.db)
      .then((rows) => {
        dispatch(tabelleGetSuccess(rows))
        if (routing.locationBeforeTransitions.pathname !== '/tabelle') dispatch(push('/tabelle'))
      })
      .catch((error) => dispatch(tabelleGetError(error)))
  }
}

export const TABELLE_GET = 'TABELLE_GET'
function tabelleGet() {
  return {
    type: TABELLE_GET
  }
}

export const TABELLE_GET_SUCCESS = 'TABELLE_GET_SUCCESS'
function tabelleGetSuccess(rows) {
  return {
    type: TABELLE_GET_SUCCESS,
    rows
  }
}

export const TABELLE_GET_ERROR = 'TABELLE_GET_ERROR'
function tabelleGetError(error) {
  return {
    type: TABELLE_GET_ERROR,
    error
  }
}

/*
 * ROW
 */

import { push } from 'react-router-redux'
import newTabelleRowInDb from '../src/newTabelleRowInDb.js'
import deleteGeschaeft from '../src/deleteGeschaeft.js'

export function rowNewCreate() {
  return (dispatch, getState) => {
    const { app, user, routing } = getState()
    newTabelleRowInDb(app.db, user.username)
      .then((row) => {
        dispatch(rowNew(row))
        dispatch(rowActivate(row.id))
        if (routing.locationBeforeTransitions.pathname !== '/tabelle') dispatch(push('/tabelle'))
      })
      .catch((error) => dispatch(geschaeftNewError(error)))
  }
}

export const ROW_NEW = 'ROW_NEW'
export function rowNew(row) {
  return {
    type: ROW_NEW,
    row
  }
}

export const GESCHAEFT_NEW_ERROR = 'GESCHAEFT_NEW_ERROR'
export function geschaeftNewError(error) {
  return {
    type: GESCHAEFT_NEW_ERROR,
    error
  }
}

export function geschaeftRemove(idGeschaeft) {
  return (dispatch, getState) => {
    const { app } = getState()
    deleteGeschaeft(app.db, idGeschaeft)
      .then(() => {
        dispatch(rowActivate(null))
        dispatch(geschaeftRemoveDeleteIntended(idGeschaeft))
        dispatch(geschaeftDelete(idGeschaeft))
      })
      .catch((error) => dispatch(geschaeftDeleteError(error)))
  }
}

export const ROW_SET_DELETE_INTENDED = 'ROW_SET_DELETE_INTENDED'
export function geschaeftSetDeleteIntended(idGeschaeft) {
  return {
    type: ROW_SET_DELETE_INTENDED,
    idGeschaeft
  }
}

export const ROW_REMOVE_DELETE_INTENDED = 'ROW_REMOVE_DELETE_INTENDED'
export function geschaeftRemoveDeleteIntended() {
  return {
    type: ROW_REMOVE_DELETE_INTENDED
  }
}

export const ROW_DELETE = 'ROW_DELETE'
export function geschaeftDelete(idGeschaeft) {
  return {
    type: ROW_DELETE,
    idGeschaeft
  }
}

export const GESCHAEFT_DELETE_ERROR = 'GESCHAEFT_DELETE_ERROR'
export function geschaeftDeleteError(error) {
  return {
    type: GESCHAEFT_DELETE_ERROR,
    error
  }
}

export const TABELLE_CHANGE_STATE = 'TABELLE_CHANGE_STATE'
export function geschaefteChangeState(idGeschaeft, field, value) {
  return {
    type: TABELLE_CHANGE_STATE,
    idGeschaeft,
    field,
    value
  }
}

export const TABELLE_CHANGE_DB_ERROR = 'TABELLE_CHANGE_DB_ERROR'
export function geschaefteChangeDbError(error) {
  // TODO: reload data from db
  return {
    type: TABELLE_CHANGE_DB_ERROR,
    error
  }
}

export function changeGeschaeftInDb(idGeschaeft, field, value) {
  return (dispatch, getState) => {
    const { app, user } = getState()
    // no need to do something on then
    // ui was updated on TABELLE_CHANGE_STATE
    updateGeschaeft(app.db, idGeschaeft, field, value, user.username)
      .catch((error) => {
        // TODO: reset ui
        dispatch(geschaefteChangeDbError(error))
      })
  }
}

export const ROW_ACTIVATE = 'ROW_ACTIVATE'
export function rowActivate(idGeschaeft) {
  return (dispatch) => {
    dispatch({
      type: ROW_ACTIVATE,
      idGeschaeft
    })
  }
}

export function rechtsmittelerledigungOptionsGet() {
  return (dispatch, getState) => {
    const { app, geschaefte } = getState()
    // only get once
    if (geschaefte.rechtsmittelerledigungOptions.length === 0) {
      getDropdownOptions(app.db, 'rechtsmittelerledigung')
        .then((rechtsmittelerledigungOptions) => dispatch(rechtsmittelerledigungOptionsGetSuccess(rechtsmittelerledigungOptions)))
        .catch((error) => dispatch(rechtsmittelerledigungOptionsGetError(error)))
    }
  }
}

export const RECHTSMITTELERLEDIGUNG_OPTIONS_GET_SUCCESS = 'RECHTSMITTELERLEDIGUNG_OPTIONS_GET_SUCCESS'
function rechtsmittelerledigungOptionsGetSuccess(rechtsmittelerledigungOptions) {
  return {
    type: RECHTSMITTELERLEDIGUNG_OPTIONS_GET_SUCCESS,
    rechtsmittelerledigungOptions
  }
}

export const RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR = 'RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR'
function rechtsmittelerledigungOptionsGetError(error) {
  return {
    type: RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR,
    error
  }
}

export function parlVorstossTypOptionsGet() {
  return (dispatch, getState) => {
    const { app, geschaefte } = getState()
    // only get once
    if (geschaefte.parlVorstossTypOptions.length === 0) {
      getDropdownOptions(app.db, 'parlVorstossTyp')
        .then((parlVorstossTypOptions) => dispatch(parlVorstossTypOptionsGetSuccess(parlVorstossTypOptions)))
        .catch((error) => dispatch(parlVorstossTypOptionsGetError(error)))
    }
  }
}

export const PARLVORSTOSSTYP_OPTIONS_GET_SUCCESS = 'PARLVORSTOSSTYP_OPTIONS_GET_SUCCESS'
function parlVorstossTypOptionsGetSuccess(parlVorstossTypOptions) {
  return {
    type: PARLVORSTOSSTYP_OPTIONS_GET_SUCCESS,
    parlVorstossTypOptions
  }
}

export const PARLVORSTOSSTYP_OPTIONS_GET_ERROR = 'PARLVORSTOSSTYP_OPTIONS_GET_ERROR'
function parlVorstossTypOptionsGetError(error) {
  return {
    type: PARLVORSTOSSTYP_OPTIONS_GET_ERROR,
    error
  }
}

export const STATUS_OPTIONS_GET = 'STATUS_OPTIONS_GET'
export function statusOptionsGet() {
  return (dispatch, getState) => {
    const { app, geschaefte } = getState()
    // only get once
    if (geschaefte.statusOptions.length === 0) {
      getDropdownOptions(app.db, 'status')
        .then((statusOptions) => dispatch(statusOptionsGetSuccess(statusOptions)))
        .catch((error) => dispatch(statusOptionsGetError(error)))
    }
  }
}

export const STATUS_OPTIONS_GET_SUCCESS = 'STATUS_OPTIONS_GET_SUCCESS'
function statusOptionsGetSuccess(statusOptions) {
  return {
    type: STATUS_OPTIONS_GET_SUCCESS,
    statusOptions
  }
}

export const STATUS_OPTIONS_GET_ERROR = 'STATUS_OPTIONS_GET_ERROR'
function statusOptionsGetError(error) {
  return {
    type: STATUS_OPTIONS_GET_ERROR,
    error
  }
}

export function geschaeftsartOptionsGet() {
  return (dispatch, getState) => {
    const { app, geschaefte } = getState()
    // only get once
    if (geschaefte.geschaeftsartOptions.length === 0) {
      getDropdownOptions(app.db, 'geschaeftsart')
        .then((geschaeftsartOptions) => dispatch(geschaeftsartOptionsGetSuccess(geschaeftsartOptions)))
        .catch((error) => dispatch(geschaeftsartOptionsGetError(error)))
    }
  }
}

export const GESCHAEFTSART_OPTIONS_GET_SUCCESS = 'GESCHAEFTSART_OPTIONS_GET_SUCCESS'
function geschaeftsartOptionsGetSuccess(geschaeftsartOptions) {
  return {
    type: GESCHAEFTSART_OPTIONS_GET_SUCCESS,
    geschaeftsartOptions
  }
}

export const GESCHAEFTSART_OPTIONS_GET_ERROR = 'GESCHAEFTSART_OPTIONS_GET_ERROR'
function geschaeftsartOptionsGetError(error) {
  return {
    type: GESCHAEFTSART_OPTIONS_GET_ERROR,
    error
  }
}
