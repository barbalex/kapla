'use strict'

// see: http://www.mylifeforthecode.com/saving-and-restoring-window-state-in-electron/

const app = require('electron').remote.app
const fs = require('fs')
const path = require('path')
const dataFilePath = path.join(app.getPath('userData'), 'kaplaConfig.json')

export default function () {
  if (!fs.existsSync(dataFilePath)) return {}
  return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'))
}
