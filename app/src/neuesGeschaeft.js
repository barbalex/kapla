'use strict'

export default function (db) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO
        geschaefte
      default VALUES`

    db.run(sql, null, (error, result) => {
      if (error) reject(error)
      console.log('neuesGeschaeft.js, result', result)
      console.log('neuesGeschaeft.js, error', error)
      console.log('neuesGeschaeft.js, this', this)
      resolve(result.lastID)
    })
  })
}
