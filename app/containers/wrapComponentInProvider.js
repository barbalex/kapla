'use strict'

/**
 * The idea for this component comes from evansb:
 * https://github.com/deepstreamIO/golden-layout/issues/86
 */

import React from 'react'
import { store } from '../index.js'
import { Provider } from 'react-redux'

export default function wrapComponent(Component, tableLayout) {
  class Wrapped extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <Component {...this.props} tableLayout={tableLayout} />
        </Provider>
      )
    }
  }
  return Wrapped
}
