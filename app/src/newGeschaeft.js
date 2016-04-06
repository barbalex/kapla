'use strict'

export default function (db) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO
        geschaefte
      default VALUES`

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
