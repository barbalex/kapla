import { GESCHAEFT_EROEFFNEN, GESCHAEFT_LOESCHEN, GESCHAEFT_AENDERN } from '../actions/geschaeft'

export default function counter (state = {}, action) {
  switch (action.type) {
    case GESCHAEFT_EROEFFNEN:
      // create new row on geschaefte
      return state + 1
    case GESCHAEFT_LOESCHEN:
      return {}
    case GESCHAEFT_AENDERN:
      return state - 1
    default:
      return state
  }
}
