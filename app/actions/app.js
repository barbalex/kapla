'use strict'

import chooseDb from '../src/chooseDb.js'
import getConfig from '../src/getConfig.js'
import saveConfigValue from '../src/saveConfigValue.js'
const sqlite3 = require('sqlite3').verbose()

export const DB_WAEHLEN = 'DB_WAEHLEN'
function waehleDb () {
  return {
    type: DB_WAEHLEN
  }
}

export const DB_GEWAEHLT = 'DB_GEWAEHLT'
function erhalteDb (dbPath, db) {
  return {
    type: DB_GEWAEHLT,
    db,
    dbPath
  }
}

export const DB_NICHT_GEWAEHLT = 'DB_NICHT_GEWAEHLT'
function nichtGewaehlteDb (error) {
  return {
    type: DB_NICHT_GEWAEHLT,
    error
  }
}

export const DB_AUS_CONFIG_HOLEN = 'DB_AUS_CONFIG_HOLEN'
export function holeDbAusConfig () {
  return (dispatch, getState) => {
    // only do this if not yet done
    const { app } = getState()
    if (!app.dbPath) {
      const dbPath = getConfig().dbPath
      if (!dbPath) {
        dispatch(holenDb())
      } else {
        const db = new sqlite3.Database(dbPath)
        dispatch(erhalteDb(dbPath, db))
      }
    }
  }
}

export const DB_HOLEN = 'DB_HOLEN'
export function holenDb () {
  return dispatch => {
    dispatch(waehleDb())
    chooseDb()
      .then((dbPath) => {
        const db = new sqlite3.Database(dbPath)
        dispatch(erhalteDb(dbPath, db))
        saveConfigValue('dbPath', dbPath)
      })
      .catch((error) => dispatch(nichtGewaehlteDb(error)))
  }
}
