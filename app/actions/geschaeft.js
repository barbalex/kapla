'use strict'

import { push } from 'react-router-redux'
import getGeschaeft from '../src/getGeschaeft.js'
import neuesGeschaeft from '../src/newGeschaeft.js'

export const GESCHAEFTE_NEU_ERSTELLEN = 'GESCHAEFTE_HOLEN'
export function erstelleNeuesGeschaeft () {
  return (dispatch, getState) => {
    const { app } = getState()
    dispatch(eroeffneGeschaeft())
    neuesGeschaeft(app.db)
      .then((idGeschaeft) => {
        dispatch(erhalteGeschaeft({idGeschaeft}))
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

export const GESCHAEFT_LOESCHEN = 'GESCHAEFT_LOESCHEN'
export function loescheGeschaeft () {
  return {
    type: GESCHAEFT_LOESCHEN
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
