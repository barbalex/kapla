'use strict'

import { remote } from 'electron'
const { dialog } = remote
import fs from 'fs'
import React from 'react'
import {
  NavItem,
  Glyphicon
} from 'react-bootstrap'

const onClickPrint = (e) => {
  e.preventDefault()
  const win = remote.getCurrentWindow()
  const printToPDFOptions = {
    marginsType: 1,
    pageSize: 'A4',
    landscape: true,
    printBackground: true
  }
  const dialogOptions = {
    title: 'pdf speichern',
    filters: [{ name: 'pdf', extensions: ['pdf'] }]
  }
  /* not working ?!
  win.webContents.print({ silent: false, printBackground: false }, (error, data) => {
    if (error) throw error
    console.log('data', data)
  })
  */
  // first remove navbar
  win.webContents.printToPDF(printToPDFOptions, (error, data) => {
    if (error) throw error
    dialog.showSaveDialog(dialogOptions, (path) => {
      if (path) {
        fs.writeFile(path, data, (err) => {
          if (err) throw err
        })
      }
    })
  })
}

const NavbarPrintNav = () =>
  <NavItem
    onClick={(e) =>
      onClickPrint(e)
    }
    title="Drucken"
  >
    <Glyphicon glyph="print" />
  </NavItem>

NavbarPrintNav.displayName = 'NavbarPrintNav'

export default NavbarPrintNav
