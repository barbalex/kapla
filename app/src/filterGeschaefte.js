'use strict'

import { includes, isString } from 'lodash'

export default function (geschaefte, filterFulltext, filterFields) {
  const existsFilterFulltext = !!filterFulltext
  const existsFilterFields = Object.keys(filterFields).length > 0
  let geschaefteGefiltert = geschaefte

  if (existsFilterFulltext) {
    geschaefteGefiltert = geschaefte.filter((geschaeft) => {
      // if any value satisfies the filter, include the geschaeft
      let satisfiesFilter = false
      Object.keys(geschaeft).forEach((key) => {
        const geschaeftValue = isString(geschaeft[key]) ? geschaeft[key].toLowerCase() : geschaeft[key]
        const filterValue = isString(filterFulltext) ? filterFulltext.toLowerCase() : filterFulltext
        if (includes(geschaeftValue, filterValue)) satisfiesFilter = true
      })
      return satisfiesFilter
    })
  } else if (existsFilterFields) {
    geschaefteGefiltert = geschaefte.filter((geschaeft) => {
      // if all conditions are met, include the geschaeft
      let satisfiesFilter = true
      Object.keys(filterFields).forEach((key) => {
        const geschaeftValue = isString(geschaeft[key]) ? geschaeft[key].toLowerCase() : geschaeft[key]
        const filterValue = isString(filterFields[key]) ? filterFields[key].value.toLowerCase() : filterFields[key].value
        const comparator = filterFields[key].comparator ? filterFields[key].comparator : '='
        if (filterValue === null) {
          if (!geschaeftValue) satisfiesFilter = false
        } else if (comparator === '!==') {
          if (!(geschaeftValue !== filterValue)) satisfiesFilter = false
        } else if (comparator === '<') {
          if (!(geschaeftValue < filterValue)) satisfiesFilter = false
        } else if (comparator === '<=') {
          if (!(geschaeftValue <= filterValue)) satisfiesFilter = false
        } else if (comparator === '>') {
          if (!(geschaeftValue > filterValue)) satisfiesFilter = false
        } else if (comparator === '>=') {
          if (!(geschaeftValue >= filterValue)) satisfiesFilter = false
        } else {
          if (!includes(geschaeftValue, filterValue)) satisfiesFilter = false
        }
      })
      return satisfiesFilter
    })
  }
  return geschaefteGefiltert
}
