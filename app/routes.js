import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import CounterPage from './containers/CounterPage'
import Geschaefte from './containers/Geschaefte'
import GeschaefteList from './containers/GeschaefteList'

export default (
<Route path='/' component={App}>
    <IndexRoute component={GeschaefteList} />
    <Route path='/counter' component={CounterPage} />
    <Route path='/geschaefte' component={Geschaefte} />
    <Route path='/geschaefteList' component={GeschaefteList} />
  </Route>
)
