'use strict'

function addVorgeschaefte(history, geschaefte, idGeschaeft) {
  const geschaeft = geschaefte.find((g) => g.idGeschaeft === idGeschaeft)
  if (!geschaeft) return null
  if (!geschaeft.idGeschaeft) return null
  if (!geschaeft.idVorgeschaeft) return null
  const vorgeschaeft = geschaefte.find((g) => g.idGeschaeft === geschaeft.idVorgeschaeft)
  if (vorgeschaeft && vorgeschaeft.idGeschaeft) {
    history.unshift(vorgeschaeft.idGeschaeft)
    if (vorgeschaeft.idVorgeschaeft) addVorgeschaefte(history, geschaefte, vorgeschaeft.idVorgeschaeft)
  }
}

function addNachgeschaefte(history, geschaefte, idGeschaeft) {
  const nachgeschaeft = geschaefte.find((g) => g.idVorgeschaeft === idGeschaeft)
  if (nachgeschaeft && nachgeschaeft.idGeschaeft) {
    history.push(nachgeschaeft.idGeschaeft)
    addNachgeschaefte(history, geschaefte, nachgeschaeft.idGeschaeft)
  }
}

export default function (history, geschaefte, idGeschaeft) {
  history.push(idGeschaeft)
  addVorgeschaefte(history, geschaefte, idGeschaeft)
  addNachgeschaefte(history, geschaefte, idGeschaeft)
}
