export default (filterFields) =>
  filterFields
    .map((ff) =>
      `${ff.field} ${ff.comparator} '${ff.value}'`
    )
    .sort()
