'use strict'

export default function (db, tName) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        *
      FROM
        ${tName}`

    db.all(sql, (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}
