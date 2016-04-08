'use strict'

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Geschaeft from './containers/Geschaeft'
import Geschaefte from './containers/Geschaefte'
import Pages from './containers/Pages'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Geschaefte} />
    <Route path="/geschaefte" component={Geschaefte}>
      <Route path="/geschaefte/:idGeschaeft" component={Geschaeft} />
    </Route>
    <Route path="/pages" component={Pages} />
  </Route>
)
