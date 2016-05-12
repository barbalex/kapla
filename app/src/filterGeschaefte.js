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
        // there are lots of empty fields
        // don't work on them
        if (geschaeft[key]) {
          if (isNaN(filterFulltext)) {
            // a string is queried
            const geschaeftValue = isString(geschaeft[key]) ? geschaeft[key].toLowerCase() : geschaeft[key]
            const filterValue = isString(filterFulltext) ? filterFulltext.toLowerCase() : filterFulltext
            if (includes(geschaeftValue, filterValue)) satisfiesFilter = true
          } else {
            // a number is queried
            // convert to string to also find 7681 when filtering for 681
            if (includes(geschaeft[key].toString(), filterFulltext.toString())) satisfiesFilter = true
          }
        }
      })
      return satisfiesFilter
    })
  } else if (existsFilterFields) {
    geschaefteGefiltert = geschaefte.filter((geschaeft) => {
      // if all conditions are met, include the geschaeft
      let satisfiesFilter = true
      filterFields.forEach((filterField, index) => {
        let geschaeftValue = geschaeft[filterField.field]
        if (isString(geschaeft[filterField.field])) geschaeftValue = geschaeft[filterField.field].toLowerCase()
        let filterValue = filterFields[index].value
        if (isString(filterFields[index].value)) filterValue = filterFields[index].value.toLowerCase()
        const comparator = filterFields[index].comparator || '='
        if (filterValue === '') {
          if (!!geschaeftValue) satisfiesFilter = false
        } else if (comparator === '!==') {
          if (!(geschaeftValue !== filterValue)) satisfiesFilter = false
        } else if (!geschaeftValue) {
          satisfiesFilter = false
        } else if (comparator === '<') {
          if (!(geschaeftValue < filterValue)) satisfiesFilter = false
        } else if (comparator === '<=') {
          if (!(geschaeftValue <= filterValue)) satisfiesFilter = false
        } else if (comparator === '>') {
          if (!(geschaeftValue > filterValue)) satisfiesFilter = false
        } else if (comparator === '>=') {
          if (!(geschaeftValue >= filterValue)) satisfiesFilter = false
        } else if (comparator === '=') {
          if (!includes(geschaeftValue, filterValue)) satisfiesFilter = false
        } else if (comparator === '===') {
          if (geschaeftValue !== filterValue) satisfiesFilter = false
        }
      })
      return satisfiesFilter
    })
  }
  return geschaefteGefiltert.map((g) => g.idGeschaeft)
}
