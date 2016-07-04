export default (geschaefte, geschaefteGefilterteIds) => {
  const geschaefteFiltered = geschaefte.filter((g) => geschaefteGefilterteIds.includes(g.idGeschaeft))
  const geschaefteSorted = geschaefteFiltered.map((g) => g.idGeschaeft)
  return geschaefteSorted
}
