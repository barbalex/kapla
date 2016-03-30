import { GESCHAEFTE_HOLEN } from '../actions/geschaefte'

export default function counter (state = [], action) {
  switch (action.type) {
    case GESCHAEFTE_HOLEN:
      // create new row on geschaefte
      // console.log('reducers/geschaefte, action', action)
      return action.geschaefte
    default:
      return state
  }
}
