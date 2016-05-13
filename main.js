'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'production'
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const crashReporter = electron.crashReporter
let menu
let template
let mainWindow = null


const saveConfigValue = require('./app/src/saveConfigValue.js')
const getConfig = require('./app/src/getConfig.js')

crashReporter.start({ companyName: 'wtf', submitURL: 'wtf@wtf.com' })

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')()
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
const browserWindowOptions = {
  width: 1800,
  height: 1024,
  icon: './app/etc/zh3.png',
  webPreferences: {
    experimentalFeatures: true
  }
}

// get last window state
// and set it again
const lastWindowState = getConfig().lastWindowState
if (lastWindowState) {
  if (lastWindowState.width) browserWindowOptions.width = lastWindowState.width
  if (lastWindowState.height) browserWindowOptions.height = lastWindowState.height
  if (lastWindowState.x) browserWindowOptions.x = lastWindowState.x
  if (lastWindowState.y) browserWindowOptions.y = lastWindowState.y
}

app.on('ready', () => {
  mainWindow = new BrowserWindow(browserWindowOptions)

  if (lastWindowState && lastWindowState.maximized) mainWindow.maximize()

  mainWindow.loadURL(`file://${__dirname}/app/app.html`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // meanwhile: always show dev tools
  // if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools()
  // }

  // save window state on close
  mainWindow.on('close', () => {
    const bounds = mainWindow.getBounds()
    saveConfigValue('lastWindowState', {
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height,
      maximized: mainWindow.isMaximized()
    })
  })

  if (process.platform === 'darwin') {
    template = [{
      label: 'Electron',
      submenu: [{
        label: 'Services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide ElectronReact',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit()
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }]

    menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } else {
    /*
    template = [{
      label: '&Datei',
      submenu: [{
        label: '&Beenden',
        accelerator: 'Ctrl+W',
        click() {
          mainWindow.close()
        }
      }]
    }]
    menu = Menu.buildFromTemplate(template)
    mainWindow.setMenu(menu)
    */
    mainWindow.setMenu(null)
  }
})
