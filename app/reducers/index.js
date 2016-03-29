import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import counter from './counter'
import geschaeft from './geschaeft'

const rootReducer = combineReducers({
  counter,
  geschaeft,
  routing
})

export default rootReducer
