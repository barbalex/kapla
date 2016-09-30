/**
 * writes a dataArray to an Excel workbook
 * this must happen in child process
 * otherwise a blank page results
 * get dataArray listening to process.send
 */

const Excel = require('exceljs')

export default (path, dataArray) =>
  new Promise((resolve, reject) => {
    const workbook = new Excel.Workbook()
    const worksheet = workbook.addWorksheet(
      'Geschäfte',
      {
        views: [
          {
            state: 'frozen',
            xSplit: 0,
            ySplit: 1
          }
        ]
      }
    )
    worksheet.addRows(dataArray)
    worksheet.getRow(1).fill = {
      type: 'gradient',
      gradient: 'angle',
      degree: 0,
      stops: [
        { position: 0, color: { argb: 'FFD3D3D3' } },
        { position: 1, color: { argb: 'FFD3D3D3' } }
      ]
    }
    worksheet.getRow(1).font = {
      bold: true
    }
    worksheet.getRow(1).border = {
      bottom: {
        style: 'thin'
      }
    }
    workbook.xlsx.writeFile(path)
      .then(() => resolve())
      .catch(err => reject(err))
  })
