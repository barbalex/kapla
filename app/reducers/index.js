'use strict'

import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import geschaefte from './geschaefte'
import geschaefteKontakteIntern from './geschaefteKontakteIntern'
import table from './table'
import user from './user'
import app from './app'
import pages from './pages'

const rootReducer = combineReducers({
  geschaefte,
  geschaefteKontakteIntern,
  table,
  pages,
  user,
  app,
  routing
})

export default rootReducer
