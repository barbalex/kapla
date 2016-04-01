'use strict'

import getGeschaeft from '../src/getGeschaeft.js'

export const GESCHAEFT_EROEFFNEN = 'GESCHAEFT_EROEFFNEN'
export function eroeffneGeschaeft () {
  return {
    type: GESCHAEFT_EROEFFNEN
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
      .then((geschaeft) => dispatch(erhalteGeschaeft(geschaeft)))
      .catch((error) => dispatch(nichtErhaltenesGeschaeft(error)))
  }
}
