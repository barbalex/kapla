'use strict'

import getGeschaefteFieldNames from './getGeschaefteFieldNames.js'
import whereStringForFieldsOr from './whereStringForFieldsOr.js'

export default function (db, fulltextFilter) {
  return new Promise((resolve, reject) => {
    getGeschaefteFieldNames(db)
      .then((result) => {
        const fieldNames = result.map((res) => res.name)
        console.log('getGeschaefteWithFulltextFilter, fieldNames', fieldNames)
        let fieldFilter = {}
        fieldNames.forEach((fieldName) => {
          fieldFilter[fieldName] = fulltextFilter
        })
        const whereString = whereStringForFieldsOr(fieldFilter)
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
      .catch((error) => reject(error))
  })
}
