'use strict'

import XLSX from 'xlsx'
import { remote } from 'electron'
const { dialog } = remote

function datenum(v, date1904) {
  let vv = v
  if (date1904) vv += 1462
  const epoch = Date.parse(vv)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

function Workbook() {
  if (!(this instanceof Workbook)) {
    return new Workbook()
  }
  this.SheetNames = []
  this.Sheets = {}
}

function sheetFromArrayOfArrays(dataArray) {
  const ws = {}
  const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } }
  let R
  let C
  let cell
  let cellRef

  for (R = 0; R !== dataArray.length; ++R) {
    for (C = 0; C !== dataArray[R].length; ++C) {
      if (range.s.r > R) { range.s.r = R }
      if (range.s.c > C) { range.s.c = C }
      if (range.e.r < R) { range.e.r = R }
      if (range.e.c < C) { range.e.c = C }
      cell = { v: dataArray[R][C] }
      if (cell.v === null) {
        continue
      }
      cellRef = XLSX.utils.encode_cell({ c: C, r: R })

      if (typeof cell.v === 'number') {
        cell.t = 'n'
      } else if (typeof cell.v === 'boolean') {
        cell.t = 'b'
      } else if (cell.v instanceof Date) {
        cell.t = 'n'
        cell.z = window.XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      } else {
        cell.t = 's'
      }

      ws[cellRef] = cell
    }
  }
  if (range.s.c < 10000000) {
    ws['!ref'] = XLSX.utils.encode_range(range)
  }
  return ws
}

function getDataArrayFromExportObjects(exportObjects) {
  const dataArray = []

  // first the field names:
  dataArray.push(Object.keys(exportObjects[0]))
  // then the field values
  exportObjects.forEach((object) => dataArray.push(Object.keys(object).map((key) => object[key])))

  return dataArray
}

const wsName = 'Geschäfte'

export default (geschaefte, showMessage) => {
  const wb = new Workbook()
  const dataArray = getDataArrayFromExportObjects(geschaefte)
  const ws = sheetFromArrayOfArrays(dataArray)
  // add worksheet to workbook
  wb.SheetNames.push(wsName)
  wb.Sheets[wsName] = ws
  const dialogOptions = {
    title: 'exportierte Geschäfte speichern',
    filters: [{ name: 'Excel-Datei', extensions: ['xlsx'] }]
  }
  dialog.showSaveDialog(dialogOptions, (path) => {
    if (path) {
      // TODO: message
      /**
       * XLSX.writeFile has no callback!!!
       * it blocks execution for a while
       * use this to message before, then remove message after blocking is finished
       */
      showMessage(true, 'Der Export wird aufgebaut...')
      console.log('XLSX', XLSX)
      setTimeout(() => {
        // TODO: this fails in release package
        // either get solution from https://github.com/electron/electron/issues/5174
        // or implement https://github.com/guyonroche/exceljs
        // solution using XLSX.write and fs.writeFile does not work
        // because xlsx is a zipped folder
        XLSX.writeFile(wb, path, { bookType: 'xlsx', bookSST: true, type: 'binary' })
        showMessage(false, null)
      }, 200)
    }
  })
}
