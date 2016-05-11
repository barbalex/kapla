'use strict'

/**
 * 
 */

import { remote } from 'electron'
const { dialog } = remote
import writeExport from './writeExport'

function getDataArrayFromExportObjects(exportObjects) {
  const dataArray = []

  // first the field names:
  dataArray.push(Object.keys(exportObjects[0]))
  // then the field values
  exportObjects.forEach((object) => dataArray.push(Object.keys(object).map((key) => {
    // exceljs errors out if forst member of array is null
    // see: https://github.com/guyonroche/exceljs/issues/111
    if (object[key] === null) return ''
    return object[key]
  })))
  return dataArray
}

export default (geschaefte, messageShow) => {
  const dialogOptions = {
    title: 'exportierte Geschäfte speichern',
    filters: [{ name: 'Excel-Datei', extensions: ['xlsx'] }]
  }
  dialog.showSaveDialog(dialogOptions, (path) => {
    if (path) {
      messageShow(true, 'Der Export wird aufgebaut...', '')
      // set timeout so message appears before exceljs starts working
      // and possibly blocks execution of message
      setTimeout(() => {
        // TODO: pass to child process
        const dataArray = getDataArrayFromExportObjects(geschaefte)
        writeExport(dataArray, path)
          .then(() => {
            messageShow(false, '', '')
          })
          .catch((error) => {
            // show the error
            messageShow(true, 'Fehler:', error.message)
            setTimeout(() => {
              messageShow(false, '', '')
            }, 8000)
          })
      }, 0)
    }
  })
}
