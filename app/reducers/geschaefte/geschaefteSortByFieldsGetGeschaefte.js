import _ from 'lodash'

export default (state, sortFields) => {
  let { geschaefte } = state
  sortFields.forEach((sf) => {
    geschaefte = _.sortBy(geschaefte, (g) => {
      if (g[sf.field]) {
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
  return geschaefte
}
