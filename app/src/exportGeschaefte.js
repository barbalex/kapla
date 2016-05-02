'use strict'

import Excel from 'exceljs'
import { remote } from 'electron'
const { dialog } = remote

function getDataArrayFromExportObjects(exportObjects) {
  const dataArray = []

  // first the field names:
  dataArray.push(Object.keys(exportObjects[0]))
  // then the field values
  exportObjects.forEach((object) => dataArray.push(Object.keys(object).map((key) => object[key])))

  return dataArray
}

export default (geschaefte, messageShow) => {
  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet('Geschäfte')
  // const worksheet = workbook.getWorksheet('Geschäfte')
  const dataArray = getDataArrayFromExportObjects(geschaefte)
  worksheet.addRows(dataArray)
  const dialogOptions = {
    title: 'exportierte Geschäfte speichern',
    filters: [{ name: 'Excel-Datei', extensions: ['xlsx'] }]
  }
  dialog.showSaveDialog(dialogOptions, (path) => {
    if (path) {
      messageShow(true, 'Der Export wird aufgebaut...', '')
      workbook.xlsx.writeFile(path)
        .then(() => {
          messageShow(false, '', '')
        })
        .catch((error) => console.log('error', error))
    }
  })
}
