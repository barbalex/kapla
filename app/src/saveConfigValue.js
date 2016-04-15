'use strict'

const getConfig = require('./getConfig.js')
const saveConfig = require('./saveConfig.js')

module.exports = function (key, value) {
  const config = getConfig()
  config[key] = value
  saveConfig(config)
}
