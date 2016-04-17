'use strict'

// this line produced error
// see: https://github.com/mapbox/node-sqlite3/issues/621
// see: https://github.com/mapbox/node-pre-gyp/pull/187
// solve with: http://verysimple.com/2015/05/30/using-node_sqlite3-with-electron/
import getGeschaefteFromDb from '../src/getGeschaefteFromDb.js'
import getDropdownOptions from '../src/getDropdownOptions.js'
import updateGeschaeft from '../src/updateGeschaeft.js'
import filterGeschaefte from '../src/filterGeschaefte.js'

export function getGeschaefte() {
  return (dispatch, getState) => {
    const { app, routing } = getState()
    dispatch(geschaefteGet())
    getGeschaefteFromDb(app.db)
      .then((geschaefte) => {
        dispatch(geschaefteGetSuccess(geschaefte))
        if (routing.locationBeforeTransitions.pathname !== '/geschaefte') dispatch(push('/geschaefte'))
      })
      .catch((error) => dispatch(geschaefteGetError(error)))
  }
}

export const GESCHAEFTE_GET = 'GESCHAEFTE_GET'
function geschaefteGet() {
  return {
    type: GESCHAEFTE_GET
  }
}

export const GESCHAEFTE_GET_SUCCESS = 'GESCHAEFTE_GET_SUCCESS'
function geschaefteGetSuccess(geschaefteArray) {
  return (dispatch, getState) => {
    const { geschaefte } = getState()
    const { filterFields, filterFulltext } = geschaefte
    // create geschaefteGefilterteIds
    const geschaefteGefilterteIds = filterGeschaefte(geschaefteArray, filterFulltext, filterFields)
    dispatch({
      type: GESCHAEFTE_GET_SUCCESS,
      geschaefte: geschaefteArray,
      geschaefteGefilterteIds
    })
  }
}

export const GESCHAEFTE_GET_ERROR = 'GESCHAEFTE_GET_ERROR'
function geschaefteGetError(error) {
  return {
    type: GESCHAEFTE_GET_ERROR,
    error
  }
}

export const GESCHAEFTE_FILTER_BY_FIELDS = 'GESCHAEFTE_FILTER_BY_FIELDS'
/*
 * filter is an object
 * keys = field names
 * values = filter values
 */
export function geschaefteFilterByFields(filterFields) {
  return (dispatch, getState) => {
    const { geschaefte } = getState()
    const { filterFulltext } = geschaefte
    // create geschaefteGefilterteIds
    const geschaefteGefilterteIds = filterGeschaefte(geschaefte.geschaefte, filterFulltext, filterFields)
    dispatch({
      type: GESCHAEFTE_FILTER_BY_FIELDS,
      filterFields,
      geschaefteGefilterteIds
    })
  }
}

export const GESCHAEFTE_FILTER_BY_FULLTEXT_SET = 'GESCHAEFTE_FILTER_BY_FULLTEXT_SET'

export function geschaefteFilterByFulltextSet(filterFulltext) {
  return (dispatch, getState) => {
    const { routing } = getState()
    dispatch({
      type: GESCHAEFTE_FILTER_BY_FULLTEXT_SET,
      filterFulltext
    })
    if (routing.locationBeforeTransitions.pathname !== '/geschaefte') dispatch(push('/geschaefte'))
  }
}

export const GESCHAEFTE_FILTER_BY_FULLTEXT = 'GESCHAEFTE_FILTER_BY_FULLTEXT'
// filter = word
export function geschaefteFilterByFulltext() {
  return (dispatch, getState) => {
    const { geschaefte, routing } = getState()
    const { filterFulltext, filterFields } = geschaefte
    // create geschaefteGefilterteIds
    const geschaefteGefilterteIds = filterGeschaefte(geschaefte.geschaefte, filterFulltext, filterFields)
    dispatch({
      type: GESCHAEFTE_FILTER_BY_FULLTEXT,
      geschaefteGefilterteIds
    })
    if (routing.locationBeforeTransitions.pathname !== '/geschaefte') dispatch(push('/geschaefte'))
  }
}

/*
 * GESCHAEFT
 */

import { push } from 'react-router-redux'
import newGeschaeftInDb from '../src/newGeschaeftInDb.js'
import deleteGeschaeft from '../src/deleteGeschaeft.js'

export function geschaeftNewCreate() {
  return (dispatch, getState) => {
    const { app, user, routing } = getState()
    newGeschaeftInDb(app.db, user.username)
      .then((geschaeft) => {
        dispatch(geschaeftNew(geschaeft))
        dispatch(aktiviereGeschaeft(geschaeft.idGeschaeft))
        if (routing.locationBeforeTransitions.pathname !== '/geschaefte') dispatch(push('/geschaefte'))
      })
      .catch((error) => dispatch(geschaeftNewError(error)))
  }
}

export const GESCHAEFT_NEW = 'GESCHAEFT_NEW'
export function geschaeftNew(geschaeft) {
  return {
    type: GESCHAEFT_NEW,
    geschaeft
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
        dispatch(aktiviereGeschaeft(null))
        dispatch(geschaeftRemoveDeleteIntended(idGeschaeft))
        dispatch(geschaeftDelete(idGeschaeft))
      })
      .catch((error) => dispatch(geschaeftDeleteError(error)))
  }
}

export const GESCHAEFT_SET_DELETE_INTENDED = 'GESCHAEFT_SET_DELETE_INTENDED'
export function geschaeftSetDeleteIntended(idGeschaeft) {
  return {
    type: GESCHAEFT_SET_DELETE_INTENDED,
    idGeschaeft
  }
}

export const GESCHAEFT_REMOVE_DELETE_INTENDED = 'GESCHAEFT_REMOVE_DELETE_INTENDED'
export function geschaeftRemoveDeleteIntended() {
  return {
    type: GESCHAEFT_REMOVE_DELETE_INTENDED
  }
}

export const GESCHAEFT_DELETE = 'GESCHAEFT_DELETE'
export function geschaeftDelete(idGeschaeft) {
  return {
    type: GESCHAEFT_DELETE,
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

export const GESCHAEFTE_CHANGE_STATE = 'GESCHAEFTE_CHANGE_STATE'
export function aendereGeschaefteState(idGeschaeft, field, value) {
  return {
    type: GESCHAEFTE_CHANGE_STATE,
    idGeschaeft,
    field,
    value
  }
}

export const GESCHAEFTE_CHANGE_DB_ERROR = 'GESCHAEFTE_CHANGE_DB_ERROR'
export function aendereGeschaeftDbFehler(error) {
  // TODO: reload data from db
  return {
    type: GESCHAEFTE_CHANGE_DB_ERROR,
    error
  }
}

export function changeGeschaeftInDb(idGeschaeft, field, value) {
  return (dispatch, getState) => {
    const { app, user } = getState()
    // no need to do something on then
    // ui was updated on GESCHAEFTE_CHANGE_STATE
    updateGeschaeft(app.db, idGeschaeft, field, value, user.username)
      .catch((error) => {
        // TODO: reset ui
        dispatch(aendereGeschaeftDbFehler(error))
      })
  }
}

export const GESCHAEFT_ACTIVATE = 'GESCHAEFT_ACTIVATE'
export function aktiviereGeschaeft(idGeschaeft) {
  return (dispatch) => {
    dispatch({
      type: GESCHAEFT_ACTIVATE,
      idGeschaeft
    })
  }
}

export const RECHTSMITTELERLEDIGUNG_OPTIONS_GET = 'RECHTSMITTELERLEDIGUNG_OPTIONS_GET'
export function holenRechtsmittelerledigungOptions() {
  return (dispatch, getState) => {
    const { app, geschaefte } = getState()
    // only get once
    if (geschaefte.rechtsmittelerledigungOptions.length === 0) {
      getDropdownOptions(app.db, 'rechtsmittelerledigung')
        .then((rechtsmittelerledigungOptions) => dispatch({
          type: RECHTSMITTELERLEDIGUNG_OPTIONS_GET,
          rechtsmittelerledigungOptions
        }))
        .catch((error) => dispatch(nichtErhalteneRechtsmittelerledigungOptions(error)))
    }
  }
}

export const RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR = 'RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR'
function nichtErhalteneRechtsmittelerledigungOptions(error) {
  return {
    type: RECHTSMITTELERLEDIGUNG_OPTIONS_GET_ERROR,
    error
  }
}

export const PARLVORSTOSSTYP_OPTIONS_GET = 'PARLVORSTOSSTYP_OPTIONS_GET'
export function holenParlVorstossTypOptions() {
  return (dispatch, getState) => {
    const { app, geschaefte } = getState()
    // only get once
    if (geschaefte.parlVorstossTypOptions.length === 0) {
      getDropdownOptions(app.db, 'parlVorstossTyp')
        .then((parlVorstossTypOptions) => dispatch({
          type: PARLVORSTOSSTYP_OPTIONS_GET,
          parlVorstossTypOptions
        }))
        .catch((error) => dispatch(nichtErhalteneParlVorstossTypOptions(error)))
    }
  }
}

export const PARLVORSTOSSTYP_OPTIONS_GET_ERROR = 'PARLVORSTOSSTYP_OPTIONS_GET_ERROR'
function nichtErhalteneParlVorstossTypOptions(error) {
  return {
    type: PARLVORSTOSSTYP_OPTIONS_GET_ERROR,
    error
  }
}

export const STATUS_OPTIONS_GET = 'STATUS_OPTIONS_GET'
export function holenStatusOptions() {
  return (dispatch, getState) => {
    const { app, geschaefte } = getState()
    // only get once
    if (geschaefte.statusOptions.length === 0) {
      getDropdownOptions(app.db, 'status')
        .then((statusOptions) => dispatch({
          type: STATUS_OPTIONS_GET,
          statusOptions
        }))
        .catch((error) => dispatch(nichtErhalteneStatusOptions(error)))
    }
  }
}

export const STATUS_OPTIONS_GET_ERROR = 'STATUS_OPTIONS_GET_ERROR'
function nichtErhalteneStatusOptions(error) {
  return {
    type: STATUS_OPTIONS_GET_ERROR,
    error
  }
}

export const GESCHAEFTSART_OPTIONS_GET = 'GESCHAEFTSART_OPTIONS_GET'
export function holenGeschaeftsartOptions() {
  return (dispatch, getState) => {
    const { app, geschaefte } = getState()
    // only get once
    if (geschaefte.geschaeftsartOptions.length === 0) {
      getDropdownOptions(app.db, 'geschaeftsart')
        .then((geschaeftsartOptions) => dispatch({
          type: GESCHAEFTSART_OPTIONS_GET,
          geschaeftsartOptions
        }))
        .catch((error) => dispatch(nichtErhalteneGeschaeftsartOptions(error)))
    }
  }
}

export const GESCHAEFTSART_OPTIONS_GET_ERROR = 'GESCHAEFTSART_OPTIONS_GET_ERROR'
function nichtErhalteneGeschaeftsartOptions(error) {
  return {
    type: GESCHAEFTSART_OPTIONS_GET_ERROR,
    error
  }
}
