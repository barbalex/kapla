'use strict'

// const BrowserWindow = require('browser-window')
import { dialog } from 'electron'

export default function () {
  dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] })
}
