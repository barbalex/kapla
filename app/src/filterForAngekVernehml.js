'use strict'

export default function () {
  const filter = [
    {
      field: 'geschaeftsart',
      value: 'Vernehmlassung',
      comparator: '='
    },
    {
      field: 'statusVernehmlassung',
      value: 'erwartet',
      comparator: '='
    }
  ]
  return filter
}
