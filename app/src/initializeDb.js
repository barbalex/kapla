'use strict'

const sqlite3 = require('sqlite3').verbose()
import ampApp from 'ampersand-app'
import getConfig from './getConfig.js'
import saveConfigValue from './saveConfigValue.js'
import chooseDb from './chooseDb.js'

function initialize (dbPath) {
  ampApp.db = new sqlite3.Database(dbPath)
  saveConfigValue('db', dbPath)
}

export default function () {
  const dbPath = getConfig().db
  if (!dbPath) {
    chooseDb()
      .then((dbPath) => initialize(dbPath))
      .catch((error) => console.log(error))
  } else {
    initialize(dbPath)
  }
}
