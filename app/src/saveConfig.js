'use strict'

// see: http://www.mylifeforthecode.com/saving-and-restoring-window-state-in-electron/

const electron = require('electron')
const app = electron.app ? electron.app : electron.remote.app
const fs = require('fs')
const path = require('path')
const dataFilePath = path.join(app.getPath('userData'), 'kaplaConfig.json')

module.exports = function (data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data))
}
