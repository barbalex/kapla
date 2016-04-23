'use strict'

export default function (db, table, id) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        ${table}
      WHERE
        id = ${id}`

    db.get(sql, (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}
