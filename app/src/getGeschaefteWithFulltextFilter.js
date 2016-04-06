'use strict'

import getGeschaefteFieldNames from './getGeschaefteFieldNames.js'
import whereStringForFieldsOr from './whereStringForFieldsOr.js'

export default function (db, fulltextFilter) {
  return new Promise((resolve, reject) => {
    getGeschaefteFieldNames(db)
      .then((result) => {
        const fieldNames = result.map((res) => res.name)
        let fieldFilter = {}
        fieldNames.forEach((fieldName) => {
          fieldFilter[fieldName] = fulltextFilter
        })
        const whereString = whereStringForFieldsOr(fieldFilter)
        const sql = `
          SELECT
            *
          FROM
            v_geschaefte
          ${whereString}
          ORDER BY
            idGeschaeft DESC`

        db.all(sql, (error, result) => {
          if (error) reject(error)
          resolve(result)
        })
      })
      .catch((error) => reject(error))
  })
}
