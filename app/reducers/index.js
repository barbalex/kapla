'use strict'

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import geschaefte from './geschaefte'
import user from './user'
import app from './app'
import pages from './pages'

const rootReducer = combineReducers({
  geschaefte,
  pages,
  user,
  routing,
  app
})

export default rootReducer
