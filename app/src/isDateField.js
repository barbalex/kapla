'use strict'

export default function isDateField(fieldName) {
  const dateFieldNames = [
    'datumEingangAwel',
    'fristAwel',
    'fristAmtschef',
    'fristAbteilung',
    'fristMitarbeiter',
    'aufbewahrungsfrist',
    'datumAusgangAwel',
    'fristDirektion'
  ]
  if (dateFieldNames.includes(fieldName)) return true
  return false
}
