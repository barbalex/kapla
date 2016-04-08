'use strict'

import moment from 'moment'

export default function (db, username) {
  return new Promise((resolve, reject) => {
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    const sql = `
      INSERT INTO
        geschaefte (mutationsdatum, mutationsperson)
      VALUES
        ('${now}', '${username}')`

    /*
     * This is weird:
     * node-sqlite3 returns the new ID
     * in the 'this' object of the callback function,
     * NOT in the result
     * so DO NOT USE ARROW FUNCTION
     */
    db.run(sql, function callback(error) {
      if (error) reject(error)
      resolve(this.lastID)
    })
  })
}
