'use strict'

export default function isDateField(fieldName) {
  const dateFieldNames = [
    'datumEingangAwel'
  ]
  if (dateFieldNames.includes(fieldName)) return true
  return false
}
