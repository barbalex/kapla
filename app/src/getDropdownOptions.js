'use strict'

export default function (db, name) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        ${name}
      FROM
        ${name}
      ORDER BY
        sort`

    db.all(sql, (error, result) => {
      if (error) reject(error)
      const options = result.map((res) => res[name])
      resolve(options)
    })
  })
}
