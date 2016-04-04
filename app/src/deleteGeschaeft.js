'use strict'

export default function (db, idGeschaeft) {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETE FROM
        geschaefte
      WHERE
        idGeschaeft = ${idGeschaeft}`

    console.log('deleteGeschaeft.js, sql', sql)

    db.run(sql, function (error, result) {
      if (error) reject(error)
      resolve(true)
    })
  })
}
