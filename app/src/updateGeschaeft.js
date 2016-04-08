'use strict'

import moment from 'moment'

export default function (db, idGeschaeft, field, value, username) {
  return new Promise((resolve, reject) => {
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    const sql = `
      UPDATE
        geschaefte
      SET
        ${field} = '${value}',
        mutationsdatum = '${now}',
        mutationsperson = '${username}'
      WHERE
        idGeschaeft = ${idGeschaeft}`

    db.run(sql, (error) => {
      if (error) reject(error)
      resolve(true)
    })
  })
}
