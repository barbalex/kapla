'use strict'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('kapla.db')

module.exports = function (fieldFilter, fulltextFilter) {
  return new Promise((resolve, reject) => {
    console.log('getGeschaefte, fieldFilter', fieldFilter)
    console.log('getGeschaefte, fulltextFilter', fulltextFilter)
    const whereArray = Object.keys(fieldFilter).map((key) => `${key} = "${fieldFilter[key]}"`)
    const whereString = whereArray.length > 0 ? ' WHERE ' + whereArray.join(' AND ') : null
    console.log('getGeschaefte, whereArray', whereArray)
    console.log('getGeschaefte, whereString', whereString)
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
