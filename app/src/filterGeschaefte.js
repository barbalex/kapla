'use strict'

import { includes, isString } from 'lodash'
import moment from 'moment'
import isDateField from './isDateField'

export default function (geschaefte, filterFulltext, filterFields) {
  const existsFilterFulltext = !!filterFulltext
  const existsFilterFields = Object.keys(filterFields).length > 0
  let geschaefteGefiltert = geschaefte
  let comparator
  const fieldsWithList = ['kontaktInternVornameName', 'kontaktExternNameVorname']

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
            const geschaeftValue = (
              isString(geschaeft[key]) ?
              geschaeft[key].toLowerCase() :
              geschaeft[key]
            )
            const filterValue = (
              isString(filterFulltext) ?
              filterFulltext.toLowerCase() :
              filterFulltext
            )
            if (includes(geschaeftValue, filterValue)) {
              satisfiesFilter = true
            }
          } else {
            // a number is queried
            // convert to string to also find 7681 when filtering for 681
            if (includes(geschaeft[key].toString(), filterFulltext.toString())) {
              satisfiesFilter = true
            }
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
        const existsGeschaeftValue = geschaeftValue || geschaeftValue === 0
        if (!existsGeschaeftValue) {
          satisfiesFilter = false
        } else {
          if (isString(geschaeft[filterField.field])) {
            geschaeftValue = geschaeft[filterField.field].toLowerCase()
          }
          let filterValue = filterFields[index].value
          if (isString(filterValue)) {
            filterValue = filterValue.toLowerCase()
          }
          const isFieldWithList = fieldsWithList.includes(filterField.field)
          if (isFieldWithList) {
            // this field is special: a comma separated list of "vorname name"
            if (!geschaeftValue.includes(filterValue)) satisfiesFilter = false
          } else {
            comparator = filterFields[index].comparator || '='
            if (filterValue === '') {
              if (!!geschaeftValue) satisfiesFilter = false
            } else if (comparator === '!==') {
              if (!(geschaeftValue !== filterValue)) satisfiesFilter = false
            } else if (!geschaeftValue) {  // TODO: remove
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
              if (isDateField(filterField.field)) {
                // this is a date - can't compare parts
                //if (geschaeftValue !== filterValue) satisfiesFilter = false
                if (!includes(moment(geschaeftValue).format('DD.MM.YYYY'), filterValue)) satisfiesFilter = false
              } else {
                if (!includes(geschaeftValue, filterValue)) satisfiesFilter = false
              }
            } else if (comparator === '===') {
              if (geschaeftValue !== filterValue) satisfiesFilter = false
            }
          }
        }
      })
      return satisfiesFilter
    })
  }
  return geschaefteGefiltert.map((g) =>
    g.idGeschaeft
  )
}
