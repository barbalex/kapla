'use strict'

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import geschaefte from './geschaefte'
import table from './table'
import user from './user'
import app from './app'
import pages from './pages'

const rootReducer = combineReducers({
  geschaefte,
  table,
  pages,
  user,
  app,
  routing
})

export default rootReducer
