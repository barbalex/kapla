'use strict'

// this line produced error
// see: https://github.com/mapbox/node-sqlite3/issues/621
// see: https://github.com/mapbox/node-pre-gyp/pull/187
// solve with: http://verysimple.com/2015/05/30/using-node_sqlite3-with-electron/
import getGeschaefte from '../src/getGeschaefte.js'
import getDropdownOptions from '../src/getDropdownOptions.js'
import updateGeschaeft from '../src/updateGeschaeft.js'
import filterGeschaefte from '../src/filterGeschaefte.js'

export const GESCHAEFTE_BESTELLEN = 'GESCHAEFTE_BESTELLEN'
function bestelleGeschaefte() {
  return {
    type: GESCHAEFTE_BESTELLEN
  }
}

export const GESCHAEFTE_ERHALTEN = 'GESCHAEFTE_ERHALTEN'
function erhalteGeschaefte(geschaefteArray) {
  return (dispatch, getState) => {
    const { geschaefte } = getState()
    const { filterFields, filterFulltext } = geschaefte
    // create geschaefteGefilterteIds
    const geschaefteGefilterteIds = filterGeschaefte(geschaefteArray, filterFulltext, filterFields)
    dispatch({
      type: GESCHAEFTE_ERHALTEN,
      geschaefte: geschaefteArray,
      geschaefteGefilterteIds
    })
  }
}

export const GESCHAEFTE_NICHT_ERHALTEN = 'GESCHAEFTE_NICHT_ERHALTEN'
function nichtErhalteneGeschaefte(error) {
  return {
    type: GESCHAEFTE_NICHT_ERHALTEN,
    error
  }
}

export const GESCHAEFTE_HOLEN = 'GESCHAEFTE_HOLEN'
export function holenGeschaefte() {
  return (dispatch, getState) => {
    const { app, routing } = getState()
    dispatch(bestelleGeschaefte())
    getGeschaefte(app.db)
      .then((geschaefte) => {
        dispatch(erhalteGeschaefte(geschaefte))
        if (routing.locationBeforeTransitions.pathname !== '/geschaefte') dispatch(push('/geschaefte'))
      })
      .catch((error) => dispatch(nichtErhalteneGeschaefte(error)))
  }
}

export const GESCHAEFTE_FILTERN_FELDER = 'GESCHAEFTE_FILTERN_FELDER'
/*
 * filter is an object
 * keys = field names
 * values = filter values
 */
export function filtereGeschaefteNachFeldern(filterFields) {
  return (dispatch, getState) => {
    const { geschaefte } = getState()
    const { filterFulltext } = geschaefte
    // create geschaefteGefilterteIds
    const geschaefteGefilterteIds = filterGeschaefte(geschaefte.geschaefte, filterFulltext, filterFields)
    dispatch({
      type: GESCHAEFTE_FILTERN_FELDER,
      filterFields,
      geschaefteGefilterteIds
    })
  }
}

export const GESCHAEFTE_VOLLTEXTFILTER_SETZEN = 'GESCHAEFTE_VOLLTEXTFILTER_SETZEN'

export function setzeGeschaefteVolltextFilter(filterFulltext) {
  return (dispatch, getState) => {
    const { routing } = getState()
    dispatch({
      type: GESCHAEFTE_VOLLTEXTFILTER_SETZEN,
      filterFulltext
    })
    if (routing.locationBeforeTransitions.pathname !== '/geschaefte') dispatch(push('/geschaefte'))
  }
}

export const GESCHAEFTE_FILTERN_VOLLTEXT = 'GESCHAEFTE_FILTERN_VOLLTEXT'
// filter = word
export function filtereGeschaefteNachVolltext() {
  return (dispatch, getState) => {
    const { geschaefte, routing } = getState()
    const { filterFulltext, filterFields } = geschaefte
    // create geschaefteGefilterteIds
    const geschaefteGefilterteIds = filterGeschaefte(geschaefte.geschaefte, filterFulltext, filterFields)
    dispatch({
      type: GESCHAEFTE_FILTERN_VOLLTEXT,
      geschaefteGefilterteIds
    })
    if (routing.locationBeforeTransitions.pathname !== '/geschaefte') dispatch(push('/geschaefte'))
  }
}

/*
 * GESCHAEFT
 */

import { push } from 'react-router-redux'
import neuesGeschaeft from '../src/newGeschaeft.js'
import deleteGeschaeft from '../src/deleteGeschaeft.js'

export const GESCHAEFT_NEU_ERSTELLEN = 'GESCHAEFT_NEU_ERSTELLEN'
export function erstelleNeuesGeschaeft() {
  return (dispatch, getState) => {
    const { app, user, routing } = getState()
    neuesGeschaeft(app.db, user.username)
      .then((geschaeft) => {
        dispatch(eroeffneGeschaeft(geschaeft))
        dispatch(aktiviereGeschaeft(geschaeft.idGeschaeft))
        if (routing.locationBeforeTransitions.pathname !== '/geschaefte') dispatch(push('/geschaefte'))
      })
      .catch((error) => dispatch(nichtEroeffnetesGeschaeft(error)))
  }
}

export const GESCHAEFT_EROEFFNEN = 'GESCHAEFT_EROEFFNEN'
export function eroeffneGeschaeft(geschaeft) {
  return {
    type: GESCHAEFT_EROEFFNEN,
    geschaeft
  }
}

export const GESCHAEFT_NICHT_EROEFFNET = 'GESCHAEFT_NICHT_EROEFFNET'
export function nichtEroeffnetesGeschaeft(error) {
  return {
    type: GESCHAEFT_NICHT_EROEFFNET,
    error
  }
}

export const GESCHAEFT_ENTFERNEN = 'GESCHAEFT_ENTFERNEN'
export function entferneGeschaeft(idGeschaeft) {
  return (dispatch, getState) => {
    const { app } = getState()
    dispatch(loescheGeschaeft())
    deleteGeschaeft(app.db, idGeschaeft)
      .then(() => {
        dispatch(aktiviereGeschaeft(null))
        dispatch(entferneGeschaeftNicht(idGeschaeft))
      })
      .catch((error) => dispatch(nichtGelöschtesGeschaeft(error)))
  }
}

export const GESCHAEFT_ENTFERNEN_WILL = 'GESCHAEFT_ENTFERNEN_WILL'
export function willGeschaeftEntfernen(idGeschaeft) {
  return {
    type: GESCHAEFT_ENTFERNEN_WILL,
    idGeschaeft
  }
}

export const GESCHAEFT_ENTFERNEN_WILL_NICHT = 'GESCHAEFT_ENTFERNEN_WILL_NICHT'
export function entferneGeschaeftNicht() {
  return {
    type: GESCHAEFT_ENTFERNEN_WILL_NICHT
  }
}

export const GESCHAEFT_LOESCHEN = 'GESCHAEFT_LOESCHEN'
export function loescheGeschaeft() {
  return {
    type: GESCHAEFT_LOESCHEN
  }
}

export const GESCHAEFT_NICHT_GELOESCHT = 'GESCHAEFT_NICHT_GELOESCHT'
export function nichtGelöschtesGeschaeft(error) {
  return {
    type: GESCHAEFT_NICHT_GELOESCHT,
    error
  }
}

export const GESCHAEFTE_AENDERN_STATE = 'GESCHAEFTE_AENDERN_STATE'
export function aendereGeschaefteState(idGeschaeft, field, value) {
  return {
    type: GESCHAEFTE_AENDERN_STATE,
    idGeschaeft,
    field,
    value
  }
}

export const GESCHAEFT_AENDERN_DB_FEHLER = 'GESCHAEFT_AENDERN_DB_FEHLER'
export function aendereGeschaeftDbFehler(error) {
  // TODO: reload data from db
  return {
    type: GESCHAEFT_AENDERN_DB_FEHLER,
    error
  }
}

export const GESCHAEFT_AENDERN_DB = 'GESCHAEFT_AENDERN_DB'
export function aendereGeschaeftDb(idGeschaeft, field, value) {
  return (dispatch, getState) => {
    const { app, user } = getState()
    updateGeschaeft(app.db, idGeschaeft, field, value, user.username)
      .then(() => {
        // update geschaeft in store
        dispatch({
          type: GESCHAEFT_AENDERN_DB,
          idGeschaeft,
          field,
          value
        })
      })
      .catch((error) => {
        // TODO: reset ui
        dispatch(aendereGeschaeftDbFehler(error))
      })
  }
}

export const GESCHAEFT_AKTIVIEREN = 'GESCHAEFT_AKTIVIEREN'
export function aktiviereGeschaeft(idGeschaeft) {
  return (dispatch) => {
    dispatch({
      type: GESCHAEFT_AKTIVIEREN,
      idGeschaeft
    })
  }
}

export const RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN = 'RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN'
export function holenRechtsmittelerledigungOptions() {
  return (dispatch, getState) => {
    const { app, geschaefte } = getState()
    // only get once
    if (geschaefte.rechtsmittelerledigungOptions.length === 0) {
      getDropdownOptions(app.db, 'rechtsmittelerledigung')
        .then((rechtsmittelerledigungOptions) => dispatch({
          type: RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN,
          rechtsmittelerledigungOptions
        }))
        .catch((error) => dispatch(nichtErhalteneRechtsmittelerledigungOptions(error)))
    }
  }
}

export const RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN_FEHLER = 'RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN_FEHLER'
function nichtErhalteneRechtsmittelerledigungOptions(error) {
  return {
    type: RECHTSMITTELERLEDIGUNG_OPTIONS_HOLEN_FEHLER,
    error
  }
}

export const PARLVORSTOSSTYP_OPTIONS_HOLEN = 'PARLVORSTOSSTYP_OPTIONS_HOLEN'
export function holenParlVorstossTypOptions() {
  return (dispatch, getState) => {
    const { app, geschaefte } = getState()
    // only get once
    if (geschaefte.parlVorstossTypOptions.length === 0) {
      getDropdownOptions(app.db, 'parlVorstossTyp')
        .then((parlVorstossTypOptions) => dispatch({
          type: PARLVORSTOSSTYP_OPTIONS_HOLEN,
          parlVorstossTypOptions
        }))
        .catch((error) => dispatch(nichtErhalteneParlVorstossTypOptions(error)))
    }
  }
}

export const PARLVORSTOSSTYP_OPTIONS_HOLEN_FEHLER = 'PARLVORSTOSSTYP_OPTIONS_HOLEN_FEHLER'
function nichtErhalteneParlVorstossTypOptions(error) {
  return {
    type: PARLVORSTOSSTYP_OPTIONS_HOLEN_FEHLER,
    error
  }
}

export const STATUS_OPTIONS_HOLEN = 'STATUS_OPTIONS_HOLEN'
export function holenStatusOptions() {
  return (dispatch, getState) => {
    const { app, geschaefte } = getState()
    // only get once
    if (geschaefte.statusOptions.length === 0) {
      getDropdownOptions(app.db, 'status')
        .then((statusOptions) => dispatch({
          type: STATUS_OPTIONS_HOLEN,
          statusOptions
        }))
        .catch((error) => dispatch(nichtErhalteneStatusOptions(error)))
    }
  }
}

export const STATUS_OPTIONS_HOLEN_FEHLER = 'STATUS_OPTIONS_HOLEN_FEHLER'
function nichtErhalteneStatusOptions(error) {
  return {
    type: STATUS_OPTIONS_HOLEN_FEHLER,
    error
  }
}

export const GESCHAEFTSART_OPTIONS_HOLEN = 'GESCHAEFTSART_OPTIONS_HOLEN'
export function holenGeschaeftsartOptions() {
  return (dispatch, getState) => {
    const { app, geschaefte } = getState()
    // only get once
    if (geschaefte.geschaeftsartOptions.length === 0) {
      getDropdownOptions(app.db, 'geschaeftsart')
        .then((geschaeftsartOptions) => dispatch({
          type: GESCHAEFTSART_OPTIONS_HOLEN,
          geschaeftsartOptions
        }))
        .catch((error) => dispatch(nichtErhalteneGeschaeftsartOptions(error)))
    }
  }
}

export const GESCHAEFTSART_OPTIONS_HOLEN_FEHLER = 'GESCHAEFTSART_OPTIONS_HOLEN_FEHLER'
function nichtErhalteneGeschaeftsartOptions(error) {
  return {
    type: GESCHAEFTSART_OPTIONS_HOLEN_FEHLER,
    error
  }
}
