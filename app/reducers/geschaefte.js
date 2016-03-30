import { GESCHAEFTE_BESTELLEN, GESCHAEFTE_ERHALTEN, GESCHAEFTE_NICHT_ERHALTEN } from '../actions/geschaefte'

const standardState = {
  fetching: false,
  error: null,
  geschaefte: []
}

export default function geschaefte (state = standardState, action) {
  switch (action.type) {
    case GESCHAEFTE_BESTELLEN:
      return Object.assign({}, state, {
        fetching: true,
        error: null
      })
    case GESCHAEFTE_ERHALTEN:
      return Object.assign({}, state, {
        fetching: false,
        error: null,
        geschaefte: action.geschaefte
      })
    case GESCHAEFTE_NICHT_ERHALTEN:
      return Object.assign({}, state, {
        fetching: false,
        error: action.error,
        geschaefte: []
      })
    default:
      return state
  }
}
