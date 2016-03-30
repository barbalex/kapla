'use strict'

// TODO: this line produces error
// see: https://github.com/mapbox/node-sqlite3/issues/621
// see: https://github.com/mapbox/node-pre-gyp/pull/187
// solve with: http://verysimple.com/2015/05/30/using-node_sqlite3-with-electron/
const getGeschaefte = require('../src/getGeschaefte.js')

export const GESCHAEFTE_BESTELLEN = 'GESCHAEFTE_BESTELLEN'
function bestelleGeschaefte () {
  return {
    type: GESCHAEFTE_BESTELLEN
  }
}

export const GESCHAEFTE_ERHALTEN = 'GESCHAEFTE_ERHALTEN'
function erhalteGeschaefte (geschaefte) {
  return {
    type: GESCHAEFTE_ERHALTEN,
    geschaefte
  }
}

export const GESCHAEFTE_NICHT_ERHALTEN = 'GESCHAEFTE_NICHT_ERHALTEN'
function nichtErhalteneGeschaefte (error) {
  return {
    type: GESCHAEFTE_NICHT_ERHALTEN,
    error
  }
}

export const GESCHAEFTE_HOLEN = 'GESCHAEFTE_HOLEN'
export function holenGeschaefte () {
  return dispatch => {
    dispatch(bestelleGeschaefte())
    getGeschaefte()
      .then((geschaefte) => dispatch(erhalteGeschaefte(geschaefte)))
      .catch((error) => {
        console.log('actions/geschaefte, error', error)
        dispatch(nichtErhalteneGeschaefte(error))
      })
  }
}
