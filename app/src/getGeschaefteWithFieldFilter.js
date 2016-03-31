'use strict'

import whereStringForFieldsAnd from './whereStringForFieldsAnd.js'

export default function (db, fieldFilter) {
  return new Promise((resolve, reject) => {
    const whereString = whereStringForFieldsAnd(fieldFilter)
    const sql = `
      SELECT
        *
      FROM
        geschaefte
      ${whereString}
      ORDER BY
        idGeschaeft DESC`

    db.all(sql, (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}
