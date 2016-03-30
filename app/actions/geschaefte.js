'use strict'

// this line produced error
// see: https://github.com/mapbox/node-sqlite3/issues/621
// see: https://github.com/mapbox/node-pre-gyp/pull/187
// solve with: http://verysimple.com/2015/05/30/using-node_sqlite3-with-electron/
import getGeschaefte from '../src/getGeschaefte.js'

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
export function holenGeschaefte (fieldFilter, fulltextFilter) {
  return dispatch => {
    console.log('actions/geschaefte, fieldFilter', fieldFilter)
    dispatch(bestelleGeschaefte())
    getGeschaefte(fieldFilter, fulltextFilter)
      .then((geschaefte) => dispatch(erhalteGeschaefte(geschaefte)))
      .catch((error) => {
        console.log('actions/geschaefte, error', error)
        dispatch(nichtErhalteneGeschaefte(error))
      })
  }
}

export const GESCHAEFTE_FILTERN_FELDER = 'GESCHAEFTE_FILTERN_FELDER'
/*
 * filter is an object
 * keys = field names
 * values = filter values
 */
export function filtereGeschaefteNachFeldern (filter) {
  return {
    type: GESCHAEFTE_FILTERN_FELDER,
    filter
  }
}

export const GESCHAEFTE_FILTERN_VOLLTEXT = 'GESCHAEFTE_FILTERN_VOLLTEXT'
// filter = word
export function filtereGeschaefteNachVolltext (filter) {
  return {
    type: GESCHAEFTE_FILTERN_VOLLTEXT,
    filter
  }
}
