'use strict'

import moment from 'moment'

export default function convertDateToDdMmYyyy(date) {
  // make sure not to convert empty values
  if (!date) return date
  return moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY')
}
