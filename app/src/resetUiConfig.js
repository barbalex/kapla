import getConfig from './getConfig'
import saveConfig from './saveConfig'

export default () => {
  const newConfig = {}
  getConfig()
    .then((config) => {
      const dbPath = config.dbPath
      if (dbPath) {
        newConfig.dbPath = dbPath
      }
      saveConfig(newConfig)
    })
    .catch((error) =>
      console.error(error)
    )
}
