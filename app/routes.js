import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Geschaeft from './containers/Geschaeft'
import Geschaefte from './containers/Geschaefte'

export default (
<Route path='/' component={App}>
    <IndexRoute component={Geschaefte} />
    <Route path='/geschaeft' component={Geschaeft} />
    <Route path='/geschaefte' component={Geschaefte} />
  </Route>
)
