'use strict'

export default function isDateField(fieldName) {
  const dateFieldNames = [
    'datumEingangAwel',
    'fristAwel',
    'fristAmtschef',
    'fristAbteilung',
    'fristMitarbeiter'
  ]
  if (dateFieldNames.includes(fieldName)) return true
  return false
}
