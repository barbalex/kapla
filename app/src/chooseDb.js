'use strict'

const dialog = require('electron').remote.dialog
const options = {
  title: 'Datenbank für Kapla wählen',
  properties: ['openFile'],
  filters: [{ name: 'sqlite-Datenbanken', extensions: ['db'] }]
}

export default function () {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog(options, (result) => {
      console.log('result[0]', result[0])
      if (result[0]) resolve(result[0])
      reject('keine Datenbank gewählt')
    })
  })
}
