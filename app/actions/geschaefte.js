'use strict'

// this line produced error
// see: https://github.com/mapbox/node-sqlite3/issues/621
// see: https://github.com/mapbox/node-pre-gyp/pull/187
// solve with: http://verysimple.com/2015/05/30/using-node_sqlite3-with-electron/
import getGeschaefte from '../src/getGeschaefte.js'
import getDropdownOptions from '../src/getDropdownOptions.js'
import updateGeschaeft from '../src/updateGeschaeft.js'

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
  return (dispatch, getState) => {
    const { app } = getState()
    dispatch(bestelleGeschaefte())
    getGeschaefte(app.db, fieldFilter, fulltextFilter)
      .then((geschaefte) => dispatch(erhalteGeschaefte(geschaefte)))
      .catch((error) => dispatch(nichtErhalteneGeschaefte(error)))
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

/*
 * GESCHAEFT
 */

'use strict'

import { push } from 'react-router-redux'
import neuesGeschaeft from '../src/newGeschaeft.js'
import deleteGeschaeft from '../src/deleteGeschaeft.js'

export const GESCHAEFT_NEU_ERSTELLEN = 'GESCHAEFT_NEU_ERSTELLEN'
export function erstelleNeuesGeschaeft () {
  return (dispatch, getState) => {
    const { app } = getState()
    neuesGeschaeft(app.db)
      .then((idGeschaeft) => {
        dispatch(eroeffneGeschaeft(idGeschaeft))
        dispatch(aktiviereGeschaeft(idGeschaeft))
        dispatch(push('/geschaeft'))
      })
      .catch((error) => dispatch(nichtEroeffnetesGeschaeft(error)))
  }
}

export const GESCHAEFT_EROEFFNEN = 'GESCHAEFT_EROEFFNEN'
export function eroeffneGeschaeft (idGeschaeft) {
  return {
    type: GESCHAEFT_EROEFFNEN,
    idGeschaeft
  }
}

export const GESCHAEFT_NICHT_EROEFFNET = 'GESCHAEFT_NICHT_EROEFFNET'
export function nichtEroeffnetesGeschaeft (error) {
  return {
    type: GESCHAEFT_NICHT_EROEFFNET,
    error
  }
}

export const GESCHAEFT_ENTFERNEN = 'GESCHAEFT_ENTFERNEN'
export function entferneGeschaeft (idGeschaeft) {
  return (dispatch, getState) => {
    const { app } = getState()
    dispatch(loescheGeschaeft())
    deleteGeschaeft(app.db, idGeschaeft)
      .then(() => {
        dispatch(aktiviereGeschaeft(null))
        dispatch(entferneGeschaeftNicht(idGeschaeft))
        dispatch(push('/geschaefte'))
      })
      .catch((error) => dispatch(nichtGelöschtesGeschaeft(error)))
  }
}

export const GESCHAEFT_ENTFERNEN_WILL = 'GESCHAEFT_ENTFERNEN_WILL'
export function willGeschaeftEntfernen (idGeschaeft) {
  return {
    type: GESCHAEFT_ENTFERNEN_WILL,
    idGeschaeft
  }
}

export const GESCHAEFT_ENTFERNEN_WILL_NICHT = 'GESCHAEFT_ENTFERNEN_WILL_NICHT'
export function entferneGeschaeftNicht (idGeschaeft) {
  return {
    type: GESCHAEFT_ENTFERNEN_WILL_NICHT
  }
}

export const GESCHAEFT_LOESCHEN = 'GESCHAEFT_LOESCHEN'
export function loescheGeschaeft () {
  return {
    type: GESCHAEFT_LOESCHEN
  }
}

export const GESCHAEFT_NICHT_GELOESCHT = 'GESCHAEFT_NICHT_GELOESCHT'
export function nichtGelöschtesGeschaeft (error) {
  return {
    type: GESCHAEFT_NICHT_GELOESCHT,
    error
  }
}

export const GESCHAEFT_AENDERN_FEHLER = 'GESCHAEFT_AENDERN_FEHLER'
export function aendereGeschaeftFehler (error) {
  return {
    type: GESCHAEFT_AENDERN_FEHLER,
    error
  }
}

export const GESCHAEFTE_AENDERN = 'GESCHAEFTE_AENDERN'
export function aendereGeschaeft (idGeschaeft, field, value) {
  return (dispatch, getState) => {
    const { app } = getState()
    updateGeschaeft(app.db, idGeschaeft, field, value)
      .then(() => {
        // update geschaeft in store
        dispatch({
          type: GESCHAEFTE_AENDERN,
          idGeschaeft,
          field,
          value
        })
      })
      .catch((error) => {
        // TODO: reset ui
        dispatch(aendereGeschaeftFehler(error))
      })
  }
}

export const GESCHAEFT_AKTIVIEREN = 'GESCHAEFT_AKTIVIEREN'
export function aktiviereGeschaeft (idGeschaeft) {
  return (dispatch) => {
    dispatch({
      type: GESCHAEFT_AKTIVIEREN,
      idGeschaeft
    })
    dispatch(push('/geschaeft'))
  }
}

export const RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN = 'RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN'
export function holenRechtsmittelerledigungOptions () {
  return (dispatch, getState) => {
    const { app } = getState()
    getDropdownOptions(app.db, 'rechtsmittelerledigung')
      .then((rechtsmittelerledigungOptions) => dispatch({
        type: RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN,
        rechtsmittelerledigungOptions
      }))
      .catch((error) => dispatch(nichtErhalteneRechtsmittelerledigungOptions(error)))
  }
}

export const RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN_FEHLER = 'RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN_FEHLER'
function nichtErhalteneRechtsmittelerledigungOptions (error) {
  return {
    type: RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN_FEHLER,
    error
  }
}

export const PARLVORSTOSSTYP_OPTIONS_HOLEN = 'PARLVORSTOSSTYP_OPTIONS_HOLEN'
export function holenParlVorstossTypOptions () {
  return (dispatch, getState) => {
    const { app } = getState()
    getDropdownOptions(app.db, 'parlVorstossTyp')
      .then((parlVorstossTypOptions) => dispatch({
        type: PARLVORSTOSSTYP_OPTIONS_HOLEN,
        parlVorstossTypOptions
      }))
      .catch((error) => dispatch(nichtErhalteneParlVorstossTypOptions(error)))
  }
}

export const PARLVORSTOSSTYP_OPTIONS_HOLEN_FEHLER = 'PARLVORSTOSSTYP_OPTIONS_HOLEN_FEHLER'
function nichtErhalteneParlVorstossTypOptions (error) {
  return {
    type: PARLVORSTOSSTYP_OPTIONS_HOLEN_FEHLER,
    error
  }
}

export const STATUS_OPTIONS_HOLEN = 'STATUS_OPTIONS_HOLEN'
export function holenStatusOptions () {
  return (dispatch, getState) => {
    const { app } = getState()
    getDropdownOptions(app.db, 'status')
      .then((statusOptions) => dispatch({
        type: STATUS_OPTIONS_HOLEN,
        statusOptions
      }))
      .catch((error) => dispatch(nichtErhalteneStatusOptions(error)))
  }
}

export const STATUS_OPTIONS_HOLEN_FEHLER = 'STATUS_OPTIONS_HOLEN_FEHLER'
function nichtErhalteneStatusOptions (error) {
  return {
    type: STATUS_OPTIONS_HOLEN_FEHLER,
    error
  }
}
