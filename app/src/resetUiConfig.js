import getConfig from './getConfig'
import saveConfig from './saveConfig'

export default () => {
  const newConfig = {}
  const dbPath = getConfig().dbPath
  if (dbPath) {
    newConfig.dbPath = dbPath
  }
  saveConfig(newConfig)
}
