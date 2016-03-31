import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import configureStore from './store/configureStore'
import './app.global.css'

// needed for material ui
// see: https://github.com/callemall/material-ui/blob/master/README.md#react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const ampApp = require('ampersand-app')
const initializeDb = require('./src/initializeDb.js')
window.app = ampApp // expose app to the browser console
initializeDb()

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store)
}
