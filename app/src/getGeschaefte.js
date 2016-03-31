'use strict'

import getGeschaefteWithFieldFilter from './getGeschaefteWithFieldFilter.js'
import getGeschaefteWithFulltextFilter from './getGeschaefteWithFulltextFilter.js'

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('kapla.db')

export default function (fieldFilter, fulltextFilter) {
  return new Promise((resolve, reject) => {
    if (fulltextFilter) {
      getGeschaefteWithFulltextFilter(db, fulltextFilter)
        .then((result) => resolve(result))
        .catch((error) => reject(error))
    } else {
      getGeschaefteWithFieldFilter(db, fieldFilter)
        .then((result) => resolve(result))
        .catch((error) => reject(error))
    }
  })
}
