'use strict'

/**
 * The idea for this component comes from evansb:
 * https://github.com/deepstreamIO/golden-layout/issues/86
 */

import React from 'react'
import store from '../store'
import { Provider } from 'react-redux'

export default function wrapComponent(Component, layout) {
  class Wrapped extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <Component {...this.props} layout={layout} />
        </Provider>
      )
    }
  }
  return Wrapped
}
