import getConfig from './getConfig.js'
import saveConfig from './saveConfig.js'

export default (val) =>
  new Promise((resolve, reject) => {
    getConfig()
      .then((config) => {
        Object.keys(val).forEach((key) => {
          config[key] = val[key]
        })
        saveConfig(config)
      })
      .catch((error) => reject(error))
  })
