'use strict'

// this line produced error
// see: https://github.com/mapbox/node-sqlite3/issues/621
// see: https://github.com/mapbox/node-pre-gyp/pull/187
// solve with: http://verysimple.com/2015/05/30/using-node_sqlite3-with-electron/
import getTableFromDb from '../src/getTableFromDb.js'
import updateTableRow from '../src/updateTableRow.js'
import * as GeschaefteActions from './geschaefte'

export function getTable(table) {
  return (dispatch, getState) => {
    const { app, routing } = getState()
    dispatch(tableGet(table))
    getTableFromDb(app.db, table)
      .then((rows) => {
        dispatch(tableGetSuccess(table, rows))
        if (routing.locationBeforeTransitions.pathname !== '/table') dispatch(push('/table'))
      })
      .catch((error) => dispatch(tableGetError(error)))
  }
}

export const TABLE_GET = 'TABLE_GET'
function tableGet(table) {
  return {
    type: TABLE_GET,
    table
  }
}

export const TABLE_GET_SUCCESS = 'TABLE_GET_SUCCESS'
function tableGetSuccess(table, rows) {
  return {
    type: TABLE_GET_SUCCESS,
    table,
    rows
  }
}

export const TABLE_GET_ERROR = 'TABLE_GET_ERROR'
function tableGetError(error) {
  return {
    type: TABLE_GET_ERROR,
    error
  }
}

/*
 * ROW
 */

import { push } from 'react-router-redux'
import newTableRowInDb from '../src/newTableRowInDb.js'
import deleteTableRow from '../src/deleteTableRow.js'

export function rowNewCreate(table) {
  return (dispatch, getState) => {
    const { app, routing } = getState()
    newTableRowInDb(app.db, table)
      .then((row) => {
        dispatch(rowNew(table, row))
        dispatch(tableRowToggleActivated(row.id))
        if (routing.locationBeforeTransitions.pathname !== '/table') dispatch(push('/table'))
      })
      .catch((error) => dispatch(tableNewError(error)))
  }
}

export const TABLE_ROW_NEW = 'TABLE_ROW_NEW'
export function rowNew(table, row) {
  return {
    type: TABLE_ROW_NEW,
    table,
    row
  }
}

export const TABLE_ROW_NEW_ERROR = 'TABLE_ROW_NEW_ERROR'
export function tableNewError(error) {
  return {
    type: TABLE_ROW_NEW_ERROR,
    error
  }
}

export function tableRowRemove(table, id) {
  return (dispatch, getState) => {
    const { app } = getState()
    deleteTableRow(app.db, table, id)
      .then(() => {
        dispatch(tableRowToggleActivated(table, ''))
        dispatch(tableRowRemoveDeleteIntended(table, id))
        dispatch(tableRowDelete(table, id))
      })
      .catch((error) => dispatch(tableRowDeleteError(error)))
  }
}

export const TABLE_ROW_SET_DELETE_INTENDED = 'TABLE_ROW_SET_DELETE_INTENDED'
export function tableRowSetDeleteIntended(table, id) {
  return {
    type: TABLE_ROW_SET_DELETE_INTENDED,
    table,
    id
  }
}

export const TABLE_ROW_REMOVE_DELETE_INTENDED = 'TABLE_ROW_REMOVE_DELETE_INTENDED'
export function tableRowRemoveDeleteIntended() {
  return {
    type: TABLE_ROW_REMOVE_DELETE_INTENDED
  }
}

export const TABLE_ROW_DELETE = 'TABLE_ROW_DELETE'
export function tableRowDelete(table, id) {
  return {
    type: TABLE_ROW_DELETE,
    id
  }
}

export const TABLE_ROW_DELETE_ERROR = 'TABLE_ROW_DELETE_ERROR'
export function tableRowDeleteError(error) {
  return {
    type: TABLE_ROW_DELETE_ERROR,
    error
  }
}

export const TABLE_CHANGE_STATE = 'TABLE_CHANGE_STATE'
export function tableChangeState(table, id, field, value) {
  return {
    type: TABLE_CHANGE_STATE,
    table,
    id,
    field,
    value
  }
}

export const TABLE_CHANGE_DB_ERROR = 'TABLE_CHANGE_DB_ERROR'
export function tableChangeDbError(error) {
  // TODO: reload data from db
  return {
    type: TABLE_CHANGE_DB_ERROR,
    error
  }
}

export function changeTableInDb(table, id, field, value) {
  return (dispatch, getState) => {
    const { app } = getState()
    // no need to do something on then
    // ui was updated on TABLE_CHANGE_STATE
    updateTableRow(app.db, table, id, field, value)
      .then(() => {
        // need to reload this table in store
        const action = `${table}OptionsGet`
        dispatch(GeschaefteActions[action]())
      })
      .catch((error) => {
        // TODO: reset ui
        dispatch(tableChangeDbError(error))
      })
  }
}

export const TABLE_ROW_TOGGLE_ACTIVATED = 'TABLE_ROW_TOGGLE_ACTIVATED'
export function tableRowToggleActivated(table, id) {
  return {
    type: TABLE_ROW_TOGGLE_ACTIVATED,
    table,
    id
  }
}
