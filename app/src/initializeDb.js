'use strict'

import getConfig from './getConfig.js'
import saveConfigValue from './saveConfigValue.js'
import chooseDb from './chooseDb.js'

function initialize (dbPath) {
  saveConfigValue('dbPath', dbPath)
}

export default function () {
  const dbPath = getConfig().dbPath
  if (!dbPath) {
    chooseDb()
      .then((dbPath) => initialize(dbPath))
      .catch((error) => console.log(error))
  } else {
    initialize(dbPath)
  }
}
