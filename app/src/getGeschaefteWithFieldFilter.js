'use strict'

import whereStringForFieldsAnd from './whereStringForFieldsAnd.js'

module.exports = function (db, fieldFilter) {
  return new Promise((resolve, reject) => {
    console.log('getGeschaefte, fieldFilter', fieldFilter)
    const whereString = whereStringForFieldsAnd(fieldFilter)
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
