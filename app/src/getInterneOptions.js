'use strict'

export default function (db) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        id, kurzzeichen
      FROM
        interne
      ORDER BY
        kurzzeichen`

    db.all(sql, (error, options) => {
      if (error) reject(error)
      resolve(options)
    })
  })
}
