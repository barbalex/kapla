'use strict'

/**
 * The idea for this component comes from evansb:
 * https://github.com/deepstreamIO/golden-layout/issues/86
 */

import React from 'react'
import store from '../store'
import { Provider } from 'react-redux'

export default function wrapComponent(Component) {
  // do not make it a stateless function as
  // golden-layout will not have access to
  // componentWillUpdate
  class Wrapped extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <Component
            {...this.props}
          />
        </Provider>
      )
    }
  }
  return Wrapped
}
