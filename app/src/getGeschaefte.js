'use strict'

const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database(':kapla:')
const db = new sqlite3.Database('kapla.db')

module.exports = function () {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT
      *
    FROM
      geschaefte
    `
    db.all(sql, (error, result) => {
      if (error) reject(error)
      console.log('getGeschaefte.js, result', result)
      resolve(result)
    })
  })
}
