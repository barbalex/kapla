'use strict'

const sqlite3 = require('sqlite3').verbose()
import chooseDb from '../src/chooseDb.js'
import getConfig from '../src/getConfig.js'
import saveConfigValue from '../src/saveConfigValue.js'
import * as GeschaefteActions from './geschaefte'
import * as GeschaefteKontakteInternActions from './geschaefteKontakteIntern'
import * as UserActions from './user'

export const MESSAGE_SHOW = 'MESSAGE_SHOW'
export function messageShow(showMessageModal, messageText) {
  return {
    type: MESSAGE_SHOW,
    showMessageModal,
    messageText
  }
}

export const NAVBAR_HIDE = 'NAVBAR_HIDE'
export function navbarHide() {
  return {
    type: NAVBAR_HIDE
  }
}

export const NAVBAR_SHOW = 'NAVBAR_SHOW'
export function navbarShow() {
  return {
    type: NAVBAR_SHOW
  }
}

export const DB_CHOOSE = 'DB_CHOOSE'
function dbChoose() {
  return {
    type: DB_CHOOSE
  }
}

export const DB_CHOOSE_SUCCESS = 'DB_CHOOSE_SUCCESS'
function dbChooseSuccess(dbPath, db) {
  return dispatch => {
    dispatch({
      type: DB_CHOOSE_SUCCESS,
      db,
      dbPath
    })
    // get data
    dispatch(UserActions.fetchUsername())
    dispatch(GeschaefteActions.getGeschaefte())
    dispatch(GeschaefteActions.rechtsmittelerledigungOptionsGet())
    dispatch(GeschaefteActions.parlVorstossTypOptionsGet())
    dispatch(GeschaefteActions.statusOptionsGet())
    dispatch(GeschaefteActions.geschaeftsartOptionsGet())
    dispatch(GeschaefteActions.interneOptionsGet())
    dispatch(GeschaefteActions.externeOptionsGet())
    dispatch(GeschaefteKontakteInternActions.getGeschaefteKontakteIntern())
  }
}

export const DB_CHOOSE_ERROR = 'DB_CHOOSE_ERROR'
function dbChooseError(error) {
  return {
    type: DB_CHOOSE_ERROR,
    error
  }
}

export function dbGetFromConfig() {
  return (dispatch, getState) => {
    // only do this if not yet done
    const { app } = getState()
    if (!app.dbPath) {
      const dbPath = getConfig().dbPath
      if (!dbPath) {
        dispatch(dbGet())
      } else {
        const db = new sqlite3.Database(dbPath)
        dispatch(dbChooseSuccess(dbPath, db))
      }
    }
  }
}

export function dbGet() {
  return dispatch => {
    dispatch(dbChoose())
    chooseDb()
      .then((dbPath) => {
        const db = new sqlite3.Database(dbPath)
        dispatch(dbChooseSuccess(dbPath, db))
        saveConfigValue('dbPath', dbPath)
      })
      .catch((error) => dispatch(dbChooseError(error)))
  }
}
