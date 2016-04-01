import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import CounterPage from './containers/CounterPage'
import Geschaeft from './containers/Geschaeft'
import Geschaefte from './containers/Geschaefte'

export default (
<Route path='/' component={App}>
    <IndexRoute component={Geschaefte} />
    <Route path='/counter' component={CounterPage} />
    <Route path='/geschaefte' component={Geschaeft} />
    <Route path='/geschaefteList' component={Geschaefte} />
  </Route>
)
