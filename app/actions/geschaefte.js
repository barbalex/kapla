'use strict'

// TODO: this line produces error
// see: https://github.com/mapbox/node-sqlite3/issues/621
// see: https://github.com/mapbox/node-pre-gyp/pull/187
const getGeschaefte = require('../src/getGeschaefte.js')

export const GESCHAEFTE_HOLEN = 'GESCHAEFTE_HOLEN'

function ersetze (geschaefte) {
  return {
    type: GESCHAEFTE_HOLEN,
    data: geschaefte
  }
}

export function hole () {
  return dispatch => {
    /*getGeschaefte()
      .then((geschaefte) => {
        dispatch(ersetze(geschaefte))
      })
      .catch((error) => console.log(error))*/
  }
}
