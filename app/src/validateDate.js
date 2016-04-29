'use strict'

import moment from 'moment'

export default function (date) {
  if (!date) return true
  return moment(date, 'DD.MM.YYYY').isValid()
}
