'use strict'

import moment from 'moment'

export default function () {
  const now = moment().format('YYYY-MM-DD')
  const filter = [
    {
      field: 'status',
      value: 'zurückgestellt',
      comparator: '!=='
    },
    {
      field: 'status',
      value: 'erledigt',
      comparator: '!=='
    },
    {
      field: 'datumAusgangAwel',
      value: '',
      comparator: '='
    },
    {
      field: 'fristMitarbeiter',
      value: now,
      comparator: '<'
    }
  ]
  return filter
}
