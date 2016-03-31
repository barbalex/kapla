'use strict'

import getConfig from './getConfig.js'
import saveConfig from './saveConfig.js'

export default function (val) {
  let config = getConfig()
  Object.keys(val).forEach((key) => config[key] = val[key])
  saveConfig(config)
}
