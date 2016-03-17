export const GESCHAEFT_EROEFFNEN = 'GESCHAEFT_EROEFFNEN'
export const GESCHAEFT_LOESCHEN = 'GESCHAEFT_LOESCHEN'
export const GESCHAEFT_AENDERN = 'GESCHAEFT_AENDERN'

export function eroeffne () {
  return {
    type: GESCHAEFT_EROEFFNEN
  }
}

export function loesche () {
  return {
    type: GESCHAEFT_LOESCHEN
  }
}

export function aendere () {
  return {
    type: GESCHAEFT_AENDERN
  }
}
