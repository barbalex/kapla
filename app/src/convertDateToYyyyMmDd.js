'use strict'

import moment from 'moment'

export default function convertDateToYyyyMmDd(date) {
  // make sure not to convert empty values
  if (!date) return date
  return moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD')
}
