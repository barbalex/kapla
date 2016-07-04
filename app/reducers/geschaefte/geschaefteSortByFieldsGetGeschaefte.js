import _ from 'lodash'
import moment from 'moment'
import isDateField from '../../src/isDateField'

export default (state, sortFields) => {
  let { geschaefte } = state
  const { geschaefteGefilterteIds } = state
  sortFields.forEach((sf) => {
    geschaefte = _.sortBy(geschaefte, (g) => {
      if (g[sf.field]) {
        if (isDateField(sf.field)) {
          // need to reformat date
          return moment(g[sf.field], 'DD.MM.YYYY').format('YYYY-MM-DD')
        }
        return g[sf.field]
      }
      return 'ZZZZ'
    })
    if (sf.direction === 'DESCENDING') {
      geschaefte = geschaefte.reverse()
    }
  })
  if (sortFields.length === 0) {
    geschaefte = _.sortBy(geschaefte, 'idGeschaeft').reverse()
  }
  // reduce to filtered
  geschaefte = geschaefte.filter((g) => geschaefteGefilterteIds.includes(g.idGeschaeft))
  return geschaefte
}
