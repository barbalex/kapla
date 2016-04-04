import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import counter from './counter'
import geschaefte from './geschaefte'
import user from './user'
import app from './app'

const rootReducer = combineReducers({
  counter,
  geschaefte,
  user,
  routing,
  app
})

export default rootReducer
