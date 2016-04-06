'use strict'

import getConfig from './getConfig.js'
import saveConfig from './saveConfig.js'

export default function (key, value) {
  const config = getConfig()
  config[key] = value
  saveConfig(config)
}
