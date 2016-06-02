'use strict'

const sqlite3 = require('sqlite3').verbose()
import chooseDb from '../src/chooseDb.js'
import getConfig from '../src/getConfig.js'
import saveConfigValue from '../src/saveConfigValue.js'
import filterForFaelligeGeschaefte from '../src/filterForFaelligeGeschaefte'
import * as GeschaefteActions from './geschaefte'
import * as GeschaefteKontakteInternActions from './geschaefteKontakteIntern'
import * as GeschaefteKontakteExternActions from './geschaefteKontakteExtern'
import * as UserActions from './user'

export const MESSAGE_SHOW = 'MESSAGE_SHOW'
export const messageShow = (showMessageModal, messageTextLine1, messageTextLine2) => ({
  type: MESSAGE_SHOW,
  showMessageModal,
  messageTextLine1,
  messageTextLine2
})

export const DB_CHOOSE = 'DB_CHOOSE'
const dbChoose = () => ({
  type: DB_CHOOSE
})

export const DB_CHOOSE_SUCCESS = 'DB_CHOOSE_SUCCESS'
const dbChooseSuccess = (dbPath, db) =>
  dispatch => {
    dispatch({
      type: DB_CHOOSE_SUCCESS,
      db,
      dbPath
    })
    // get data
    dispatch(UserActions.fetchUsername())
    dispatch(GeschaefteActions.getGeschaefte())
    dispatch(GeschaefteActions.rechtsmittelErledigungOptionsGet())
    dispatch(GeschaefteActions.parlVorstossTypOptionsGet())
    dispatch(GeschaefteActions.statusOptionsGet())
    dispatch(GeschaefteActions.geschaeftsartOptionsGet())
    dispatch(GeschaefteActions.rechtsmittelInstanzOptionsGet())
    dispatch(GeschaefteActions.statusVernehmlassungOptionsGet())
    dispatch(GeschaefteActions.interneOptionsGet())
    dispatch(GeschaefteActions.externeOptionsGet())
    dispatch(GeschaefteKontakteInternActions.getGeschaefteKontakteIntern())
    dispatch(GeschaefteKontakteExternActions.getGeschaefteKontakteExtern())
    // set filter to fällige
    dispatch(GeschaefteActions.geschaefteFilterByFields(filterForFaelligeGeschaefte(), 'fällige'))
  }

export const DB_CHOOSE_ERROR = 'DB_CHOOSE_ERROR'
const dbChooseError = (error) => ({
  type: DB_CHOOSE_ERROR,
  error
})

export const dbGetFromConfig = () =>
  (dispatch, getState) => {
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
