'use strict'

const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database(':kapla:')
const db = new sqlite3.Database('kapla.db')

module.exports = function () {
  const sql = `
  SELECT
    *
  FROM
    geschaefte
  `
  db.all(sql, (error, result) => {
    if (error) return console.log(error)
    console.log('getGeschaefte.js, result', result)
    return result
  })
}
