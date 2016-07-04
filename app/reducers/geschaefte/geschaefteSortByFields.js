export default (state, action) => {
  const sortFieldsWithoutPassedField = state.sortFields.map((sf) =>
    sf.field !== action.field
  )
  if (!action.direction) {
    // remove field
    return sortFieldsWithoutPassedField
  }
  return [
    ...sortFieldsWithoutPassedField,
    {
      field: action.field,
      direction: action.direction,
    }
  ]
}
