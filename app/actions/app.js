'use strict'

const sqlite3 = require('sqlite3').verbose()
import chooseDb from '../src/chooseDb.js'
import getConfig from '../src/getConfig.js'
import saveConfigValue from '../src/saveConfigValue.js'
import saveConfig from '../src/saveConfig.js'
import filterForFaelligeGeschaefte from '../src/filterForFaelligeGeschaefte'
import resetUiConfig from '../src/resetUiConfig'
import * as GeschaefteActions from './geschaefte'
import * as GeschaefteKontakteInternActions from './geschaefteKontakteIntern'
import * as GeschaefteKontakteExternActions from './geschaefteKontakteExtern'
import * as UserActions from './user'

export const CONFIG_GET = 'CONFIG_GET'
const configGet = () =>
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
        dbGetFromConfig(newConfig)
      })
      .catch((error) =>
        console.error(error)
      )
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

export const TABLE_COLUMN_WIDTH_GET_FROM_DB = 'TABLE_COLUMN_WIDTH_GET_FROM_DB'
const tableColumnWidthGetFromDb = () =>
  (dispatch) => {
    getConfig()
      .then((config) => {
        const tableColumnWidth = config.tableColumnWidth
        // only dispatch if a value exists
        // if not: reducer will set default value
        if (tableColumnWidth) {
          dispatch({
            type: TABLE_COLUMN_WIDTH_GET_FROM_DB,
            tableColumnWidth
          })
        }
      })
      .catch((error) => console.error(error))
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

export const GESCHAEFTE_COLUMN_WIDTH_GET_FROM_DB = 'GESCHAEFTE_COLUMN_WIDTH_GET_FROM_DB'
const geschaefteColumnWidthGetFromDb = () =>
  (dispatch) => {
    getConfig()
      .then((config) => {
        const geschaefteColumnWidth = config.geschaefteColumnWidth
        // only dispatch if a value exists
        // if not: reducer will set default value
        if (geschaefteColumnWidth) {
          dispatch({
            type: GESCHAEFTE_COLUMN_WIDTH_GET_FROM_DB,
            geschaefteColumnWidth
          })
        }
      })
      .catch((error) => console.error(error))
  }

export const GESCHAEFTECOLUMN_SET = 'GESCHAEFTECOLUMN_SET'
export const geschaefteColumnSet = (geschaefteColumnWidth) => ({
  type: GESCHAEFTECOLUMN_SET,
  geschaefteColumnWidth
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

export const UI_CONFIG_RESET = 'UI_CONFIG_RESET'
export const uiConfigReset = () =>
  (dispatch) => {
    resetUiConfig()
    dispatch({
      type: UI_CONFIG_RESET
    })
  }

export const DB_CHOOSE_SUCCESS = 'DB_CHOOSE_SUCCESS'
const dbChooseSuccess = (dbPath, db) =>
  dispatch => {
    dispatch({
      type: DB_CHOOSE_SUCCESS,
      db,
      dbPath
    })
    // get data
    dispatch(configGet())
    dispatch(geschaefteColumnWidthGetFromDb())
    dispatch(tableColumnWidthGetFromDb())
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

export const dbGetFromConfig = (config) =>
  (dispatch) => {
    // only do this if not yet done
    const { dbPath } = config
    if (!dbPath) {
      dispatch(dbGet())
    } else {
      const db = new sqlite3.Database(dbPath)
      dispatch(dbChooseSuccess(dbPath, db))
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
