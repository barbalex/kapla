'use strict'

import chooseDb from '../src/chooseDb.js'
import saveConfigValue from '../src/saveConfigValue.js'

export const DB_WAEHLEN = 'DB_WAEHLEN'
function waehleDb () {
  return {
    type: DB_WAEHLEN
  }
}

export const DB_GEWAEHLT = 'DB_GEWAEHLT'
function erhalteDb (db) {
  return {
    type: DB_GEWAEHLT,
    db
  }
}

export const DB_NICHT_GEWAEHLT = 'DB_NICHT_GEWAEHLT'
function nichtGewaehlteDb (error) {
  return {
    type: DB_NICHT_GEWAEHLT,
    error
  }
}

export const DB_HOLEN = 'DB_HOLEN'
export function holenDb () {
  return dispatch => {
    dispatch(waehleDb())
    chooseDb()
      .then((db) => {
        dispatch(erhalteDb(db))
        saveConfigValue('db', db)
      })
      .catch((error) => dispatch(nichtGewaehlteDb(error)))
  }
}
