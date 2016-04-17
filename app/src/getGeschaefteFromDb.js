'use strict'

export default function (db) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        v_geschaefte
      ORDER BY
        idGeschaeft DESC`

    db.all(sql, (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}
