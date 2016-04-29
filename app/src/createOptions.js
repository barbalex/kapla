'use strict'

import React from 'react'

export default function (values) {
  const options = values.map((val, index) => <option key={index + 1} value={val}>{val}</option>)
  options.unshift(<option key={0} value=""></option>)
  return options
}
