'use strict'

const sqlite3 = require('sqlite3').verbose()
import chooseDb from '../src/chooseDb.js'
import getConfig from '../src/getConfig.js'
import saveConfig from '../src/saveConfig.js'
import filterForFaelligeGeschaefte from '../src/filterForFaelligeGeschaefte'
import * as GeschaefteActions from './geschaefte'
import * as GeschaefteKontakteInternActions from './geschaefteKontakteIntern'
import * as GeschaefteKontakteExternActions from './geschaefteKontakteExtern'
import * as UserActions from './user'

export const CONFIG_GET = 'CONFIG_GET'
export const configGet = () =>
  (dispatch) => {
    getConfig()
      .then((config) => {
        let newConfig = config
        if (!newConfig) {
          newConfig = {}
        }
        dispatch({
          type: CONFIG_GET,
          config: newConfig
        })
        console.log('now get db, newConfig', newConfig)
        const { dbPath } = newConfig
        console.log('now get db, dbPath', dbPath)
        if (!dbPath) {
          dispatch(dbGet())
        } else {
          const db = new sqlite3.Database(dbPath)
          dispatch(dbChooseSuccess(dbPath, db))
        }
      })
      .catch((error) =>
        console.error(error)
      )
  }

export const configUiReset = () =>
  (dispatch, getState) => {
    const { config } = getState().app
    const newConfig = {}
    const dbPath = config.dbPath
    if (dbPath) {
      newConfig.dbPath = dbPath
    }
    dispatch({
      type: CONFIG_GET,
      config: newConfig
    })
  }

export const CONFIG_SET = 'CONFIG_SET'
export const configSet = (key, value) =>
  (dispatch, getState) => {
    const { config } = getState().app
    if (value) {
      config[key] = value
    } else {
      if (config[key]) delete config[key]
    }
    saveConfig(config)
    dispatch({
      type: CONFIG_SET,
      config
    })
  }

export const TABLECOLUMN_SET = 'TABLECOLUMN_SET'
export const tableColumnSet = (tableColumnWidth) => ({
  type: TABLECOLUMN_SET,
  tableColumnWidth
})

export const TABLELAYOUT_SET = 'TABLELAYOUT_SET'
export const tableLayoutSet = (tableLayout) => ({
  type: TABLELAYOUT_SET,
  tableLayout
})

export const GESCHAEFTELAYOUT_SET = 'GESCHAEFTELAYOUT_SET'
export const geschaefteLayoutSet = (geschaefteLayout) => ({
  type: GESCHAEFTELAYOUT_SET,
  geschaefteLayout
})

export const FILTERFIELDSLAYOUT_SET = 'FILTERFIELDSLAYOUT_SET'
export const filterFieldsLayoutSet = (filterFieldsLayout) => ({
  type: FILTERFIELDSLAYOUT_SET,
  filterFieldsLayout
})

export const MESSAGE_SHOW = 'MESSAGE_SHOW'
export const messageShow = (
  showMessageModal,
  messageTextLine1,
  messageTextLine2
) => ({
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
  (dispatch) => {
    configSet('dbPath', dbPath)
    dispatch({
      type: DB_CHOOSE_SUCCESS,
      db
    })
    // get data
    dispatch(UserActions.fetchUsername())
    dispatch(GeschaefteActions.getGeschaefte())
    dispatch(GeschaefteActions.rechtsmittelErledigungOptionsGet())
    dispatch(GeschaefteActions.parlVorstossTypOptionsGet())
    dispatch(GeschaefteActions.statusOptionsGet())
    dispatch(GeschaefteActions.geschaeftsartOptionsGet())
    dispatch(GeschaefteActions.rechtsmittelInstanzOptionsGet())
    dispatch(GeschaefteActions.abteilungOptionsGet())
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

export function dbGet() {
  return dispatch => {
    dispatch(dbChoose())
    chooseDb()
      .then((dbPath) => {
        const db = new sqlite3.Database(dbPath)
        dispatch(dbChooseSuccess(dbPath, db))
        configSet('dbPath', dbPath)
      })
      .catch((error) => dispatch(dbChooseError(error)))
  }
}
