'use strict'

/**
 * writes a dataArray to an Excel workbook
 * TODO: this must happen in child process
 * get dataArray sistening to process.send
 */

import Excel from 'exceljs'

export default function (dataArray, path) {
  return new Promise((resolve, reject) => {
    // TODO: pass to child process
    const workbook = new Excel.Workbook()
    const worksheet = workbook.addWorksheet('Geschäfte')
    worksheet.addRows(dataArray)
    workbook.xlsx.writeFile(path)
      .then(() => resolve(true))
      .catch((error) => reject(error))
  })
}
