'use strict'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('kapla.db')

module.exports = function (fieldFilter, fulltextFilter) {
  return new Promise((resolve, reject) => {
    if (fulltextFilter) {
      // TODO: build fieldFilter with all fields
      // using PRAGMA table_info(table_name)

    }
    const whereArray = Object.keys(fieldFilter).map((key) => `${key} LIKE "%${String(fieldFilter[key])}%"`)
    let whereString = whereArray.length > 0 ? ' WHERE ' + whereArray.join(' AND ') : ''
    const sql = `
      SELECT
        *
      FROM
        geschaefte
      ${whereString}
      ORDER BY
        idGeschaeft DESC`
    console.log('getGeschaefte, sql', sql)

    db.all(sql, (error, result) => {
      if (error) reject(error)
      console.log('getGeschaefte, result', result)
      resolve(result)
    })
  })
}
