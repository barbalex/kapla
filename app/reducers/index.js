import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import counter from './counter'
import geschaeft from './geschaeft'
import geschaefte from './geschaefte'
import user from './user'
import app from './app'

const rootReducer = combineReducers({
  counter,
  geschaeft,
  geschaefte,
  user,
  routing,
  app
})

export default rootReducer
