'use strict'

const getConfig = require('./getConfig.js')
const saveConfig = require('./saveConfig.js')

module.exports = function (val) {
  const config = getConfig()
  Object.keys(val).forEach((key) => {
    config[key] = val[key]
  })
  saveConfig(config)
}
