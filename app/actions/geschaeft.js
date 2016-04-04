'use strict'

import { push } from 'react-router-redux'
import getGeschaeft from '../src/getGeschaeft.js'
import neuesGeschaeft from '../src/newGeschaeft.js'
import deleteGeschaeft from '../src/deleteGeschaeft.js'

export const GESCHAEFTE_NEU_ERSTELLEN = 'GESCHAEFTE_NEU_ERSTELLEN'
export function erstelleNeuesGeschaeft () {
  return (dispatch, getState) => {
    const { app } = getState()
    dispatch(eroeffneGeschaeft())
    neuesGeschaeft(app.db)
      .then((geschaeft) => {
        dispatch(erhalteGeschaeft(geschaeft))
        dispatch(push('/geschaeft'))
      })
      .catch((error) => dispatch(nichtEroeffnetesGeschaeft(error)))
  }
}

export const GESCHAEFT_EROEFFNEN = 'GESCHAEFT_EROEFFNEN'
export function eroeffneGeschaeft () {
  return {
    type: GESCHAEFT_EROEFFNEN
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
        dispatch(erhalteGeschaeft({}))
        dispatch(entferneGeschaeftNicht(idGeschaeft))
        dispatch()
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

export const GESCHAEFT_AENDERN = 'GESCHAEFT_AENDERN'
export function aendereGeschaeft () {
  return {
    type: GESCHAEFT_AENDERN
  }
}

export const GESCHAEFT_BESTELLEN = 'GESCHAEFT_BESTELLEN'
function bestelleGeschaeft () {
  return {
    type: GESCHAEFT_BESTELLEN
  }
}

export const GESCHAEFT_ERHALTEN = 'GESCHAEFT_ERHALTEN'
function erhalteGeschaeft (geschaeft) {
  return {
    type: GESCHAEFT_ERHALTEN,
    geschaeft
  }
}

export const GESCHAEFT_NICHT_ERHALTEN = 'GESCHAEFT_NICHT_ERHALTEN'
function nichtErhaltenesGeschaeft (error) {
  return {
    type: GESCHAEFT_NICHT_ERHALTEN,
    error
  }
}

export const GESCHAEFT_HOLEN = 'GESCHAEFT_HOLEN'
export function holenGeschaeft (idGeschaeft) {
  return (dispatch, getState) => {
    const { app } = getState()
    dispatch(bestelleGeschaeft())
    getGeschaeft(app.db, idGeschaeft)
      .then((geschaeft) => {
        dispatch(erhalteGeschaeft(geschaeft))
        dispatch(push('/geschaeft'))
      })
      .catch((error) => dispatch(nichtErhaltenesGeschaeft(error)))
  }
}
