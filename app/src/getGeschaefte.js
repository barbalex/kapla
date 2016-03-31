'use strict'

import ampApp from 'ampersand-app'
import getGeschaefteWithFieldFilter from './getGeschaefteWithFieldFilter.js'
import getGeschaefteWithFulltextFilter from './getGeschaefteWithFulltextFilter.js'

const db = ampApp.db

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
