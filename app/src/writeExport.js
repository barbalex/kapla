/**
 * writes a dataArray to an Excel workbook
 * this must happen in child process
 * otherwise a blank page results
 * get dataArray sistening to process.send
 */

const Excel = require('exceljs')

// path is passed as only argument of the process
// but first two arguments are used by node internally
const path = process.argv[2]

// dataArray is passed as message
// because process arguments can only be strings
process.on('message', (dataArray) => {
  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet('Geschäfte')
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
    .then(() =>
      process.send({ success: true })
    )
    .catch((err) =>
      process.send({ error: err })
    )
})
