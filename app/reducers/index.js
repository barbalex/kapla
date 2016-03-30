import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import counter from './counter'
import geschaeft from './geschaeft'
import geschaefte from './geschaefte'

const rootReducer = combineReducers({
  counter,
  geschaeft,
  geschaefte,
  routing
})

export default rootReducer
