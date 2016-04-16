'use strict'

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Geschaeft from './containers/Geschaeft'
import GeschaefteLayout from './components/GeschaefteLayout'
import Pages from './containers/Pages'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={GeschaefteLayout} />
    <Route path="/geschaefte" component={GeschaefteLayout} />
    <Route path="/geschaefte/:idGeschaeft" component={Geschaeft} />
    <Route path="/pages" component={Pages} />
  </Route>
)
