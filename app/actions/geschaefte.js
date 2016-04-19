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
        dispatch(geschaeftToggleActivated(geschaeft.idGeschaeft))
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
export function geschaefteChangeState(idGeschaeft, field, value) {
  return {
    type: GESCHAEFTE_CHANGE_STATE,
    idGeschaeft,
    field,
    value
  }
}

export const GESCHAEFTE_CHANGE_DB_ERROR = 'GESCHAEFTE_CHANGE_DB_ERROR'
export function geschaefteChangeDbError(error) {
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
        dispatch(geschaefteChangeDbError(error))
      })
  }
}

export const GESCHAEFT_TOGGLE_ACTIVATED = 'GESCHAEFT_TOGGLE_ACTIVATED'
export function geschaeftToggleActivated(idGeschaeft) {
  return {
    type: GESCHAEFT_TOGGLE_ACTIVATED,
    idGeschaeft
  }
}

export function rechtsmittelerledigungOptionsGet() {
  return (dispatch, getState) => {
    const { app } = getState()
    getDropdownOptions(app.db, 'rechtsmittelerledigung')
      .then((rechtsmittelerledigungOptions) => dispatch(rechtsmittelerledigungOptionsGetSuccess(rechtsmittelerledigungOptions)))
      .catch((error) => dispatch(rechtsmittelerledigungOptionsGetError(error)))
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
    const { app } = getState()
    getDropdownOptions(app.db, 'parlVorstossTyp')
      .then((parlVorstossTypOptions) => dispatch(parlVorstossTypOptionsGetSuccess(parlVorstossTypOptions)))
      .catch((error) => dispatch(parlVorstossTypOptionsGetError(error)))
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
    const { app } = getState()
    getDropdownOptions(app.db, 'status')
      .then((statusOptions) => dispatch(statusOptionsGetSuccess(statusOptions)))
      .catch((error) => dispatch(statusOptionsGetError(error)))
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
    const { app } = getState()
    getDropdownOptions(app.db, 'geschaeftsart')
      .then((geschaeftsartOptions) => dispatch(geschaeftsartOptionsGetSuccess(geschaeftsartOptions)))
      .catch((error) => dispatch(geschaeftsartOptionsGetError(error)))
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
