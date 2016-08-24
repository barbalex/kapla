/**
 * gets save path
 * TODO: should call writeExport in child process
 *
 * pass dataArray using process.send
 * kill child process at end?
 */

import electron, { remote } from 'electron'
import pathModule from 'path'
import childProcess from 'child_process'

const { dialog } = remote
const app = (
  process.type === 'browser' ?
  electron.app :
  electron.remote.app
)

function getDataArrayFromExportObjects(exportObjects) {
  const dataArray = []

  // first the field names:
  dataArray
    .push(
      Object.keys(exportObjects[0])
    )
  // then the field values
  exportObjects.forEach((object) =>
    dataArray
      .push(
        Object.keys(object)
          .map((key, index) => {
            /**
             * exceljs errors out if first member of array is null
             * see: https://github.com/guyonroche/exceljs/issues/111
             * unfortunately there is also an issue with passing ''
             * in version 0.2.8
             * see: https://github.com/guyonroche/exceljs/issues/120
             */
            if (object[key] === null && index === 0) return ''
            return object[key]
          })
      ))
  return dataArray
}

export default (geschaefte, messageShow) => {
  const dialogOptions = {
    title: 'exportierte Geschäfte speichern',
    filters: [
      {
        name: 'Excel-Datei',
        extensions: ['xlsx']
      }
    ],
  }
  dialog.showSaveDialog(dialogOptions, (path) => {
    if (path) {
      messageShow(true, 'Der Export wird aufgebaut...', '')
      // set timeout so message appears before exceljs starts working
      // and possibly blocks execution of message
      setTimeout(() => {
        const dataArray = getDataArrayFromExportObjects(geschaefte)
        // pass to child process
        const appPath = app.getAppPath()
        const writeExportPath = pathModule.resolve(appPath, 'app/src/writeExport.js')
        const cp = childProcess.fork(writeExportPath, [path])
        // send dataArray
        cp.send(dataArray)
        // listen to response
        cp.on('message', (message) => {
          if (message.success) {
            // show the message
            const msg = `Die Geschäfte wurden nach ${path} exportiert`
            messageShow(true, msg, '')
            setTimeout(() =>
              messageShow(false, '', ''), 8000
            )
          } else if (message.error) {
            // show the error
            messageShow(true, 'Fehler:', message.error)
            setTimeout(() =>
              messageShow(false, '', ''), 8000
            )
          } else {
            // always hide message
            messageShow(false, '', '')
          }
        })
      }, 0)
    }
  })
}
