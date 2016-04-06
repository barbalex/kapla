'use strict'

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import geschaefte from './geschaefte'
import user from './user'
import app from './app'

const rootReducer = combineReducers({
  geschaefte,
  user,
  routing,
  app
})

export default rootReducer
