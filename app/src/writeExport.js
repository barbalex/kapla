'use strict'

/**
 * writes a dataArray to an Excel workbook
 * TODO: this must happen in child process
 * get dataArray sistening to process.send
 */

const Excel = require('exceljs')

module.exports = function writeExport() {
  // TODO: pass to child process
  const path = process.argv[2]
  console.log('writeExport, path', path)
  process.on('message', (dataArray) => {
    console.log('writeExport, on message, dataArray', dataArray)
    const workbook = new Excel.Workbook()
    const worksheet = workbook.addWorksheet('Geschäfte')
    worksheet.addRows(dataArray)
    workbook.xlsx.writeFile(path)
      .then(() => {
        // TODO: message done
      })
      .catch((error) => {
        // TODO: message error
      })
  })
}
