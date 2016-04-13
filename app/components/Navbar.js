'use strict'

import { remote } from 'electron'
const { dialog } = remote
import fs from 'fs'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {
  Navbar,
  NavDropdown,
  MenuItem,
  Nav,
  NavItem,
  Glyphicon,
  Input,
  Badge
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { throttle } from 'lodash'
import ModalGeschaeftDelete from '../containers/ModalGeschaeftDelete.js'
import ModalMessage from '../components/ModalMessage.js'
import styles from './Navbar.css'

class NavbarComponent extends Component {
  static propTypes = {
    holenDb: PropTypes.func.isRequired,
    setzeGeschaefteVolltextFilter: PropTypes.func.isRequired,
    filtereGeschaefteNachVolltext: PropTypes.func.isRequired,
    username: PropTypes.string,
    erstelleNeuesGeschaeft: PropTypes.func.isRequired,
    willGeschaeftEntfernen: PropTypes.func.isRequired,
    activeId: PropTypes.number,
    filterFulltext: PropTypes.string,
    geschaefte: PropTypes.array,
    geschaefteGefiltert: PropTypes.array,
    pages: PropTypes.array,
    fetchUsername: PropTypes.func.isRequired,
    holeDbAusConfig: PropTypes.func.isRequired,
    holenGeschaefte: PropTypes.func.isRequired,
    holenRechtsmittelerledigungOptions: PropTypes.func.isRequired,
    holenParlVorstossTypOptions: PropTypes.func.isRequired,
    holenStatusOptions: PropTypes.func.isRequired,
    holenGeschaeftsartOptions: PropTypes.func.isRequired,
    willDeleteGeschaeft: PropTypes.bool,
    pagesInitiate: PropTypes.func.isRequired,
    navbarVisible: PropTypes.bool.isRequired,
    hideNavbar: PropTypes.func.isRequired,
    showNavbar: PropTypes.func.isRequired,
    buildingPages: PropTypes.bool.isRequired
  }

  componentWillMount() {
    const {
      fetchUsername,
      holeDbAusConfig,
      holenGeschaefte,
      holenRechtsmittelerledigungOptions,
      holenParlVorstossTypOptions,
      holenStatusOptions,
      holenGeschaeftsartOptions
    } = this.props

    fetchUsername()
    holeDbAusConfig()
    throttle(holenGeschaefte, 200)
    throttle(holenRechtsmittelerledigungOptions, 1000)
    throttle(holenParlVorstossTypOptions, 1000)
    throttle(holenStatusOptions, 1000)
    throttle(holenGeschaeftsartOptions, 1000)
  }

  componentDidMount() {
    const navBar = ReactDOM.findDOMNode(this).querySelector('nav.navbar')
    const collapsibleNav = navBar.querySelector('div.navbar-collapse')
    const btnToggle = navBar.querySelector('button.navbar-toggle')

    navBar.addEventListener('click', (evt) => {
      if (evt.target.tagName !== 'A' || evt.target.classList.contains('dropdown-toggle') || ! collapsibleNav.classList.contains('in')) {
        return
      }

      btnToggle.click()
    }, false)
  }

  onChangeFilterFulltext = (e) => {
    const { setzeGeschaefteVolltextFilter } = this.props
    setzeGeschaefteVolltextFilter(e.target.value)
  }

  onKeyPressFilterFulltext = (e) => {
    const { filtereGeschaefteNachVolltext } = this.props
    if (e.key === 'Enter') {
      filtereGeschaefteNachVolltext(e.target.value)
    }
  }

  onClickRemoveFilterGlyph = () => {
    const { setzeGeschaefteVolltextFilter, filtereGeschaefteNachVolltext } = this.props
    const filterFulltext = ''
    setzeGeschaefteVolltextFilter(filterFulltext)
    filtereGeschaefteNachVolltext(filterFulltext)
  }

  onClickPrint = (e) => {
    const {
      showNavbar,
      hideNavbar
    } = this.props
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
    hideNavbar()
    win.webContents.printToPDF(printToPDFOptions, (error, data) => {
      if (error) throw error
      dialog.showSaveDialog(dialogOptions, (path) => {
        if (path) {
          fs.writeFile(path, data, (err) => {
            // re-add navbar
            showNavbar()
            if (err) throw err
          })
        }
      })
    })
  }

  printNav = () => (
    <NavItem
      eventKey = {7}
      onClick = {this.onClickPrint}
      title = "Drucken"
    >
      <Glyphicon glyph = "print" />
    </NavItem>
  )

  render() {
    const {
      holenDb,
      activeId,
      geschaefte,
      geschaefteGefiltert,
      filterFulltext,
      willDeleteGeschaeft,
      pages,
      navbarVisible,
      buildingPages,
      pagesInitiate,
      erstelleNeuesGeschaeft,
      willGeschaeftEntfernen
    } = this.props

    if (!navbarVisible) return null

    const dataIsFiltered = geschaefte.length !== geschaefteGefiltert.length
    const dataIsFilteredStyle = [styles.filterInput, styles.filterInputActive].join(' ')
    const classNameFilterInput = dataIsFiltered ? dataIsFilteredStyle : styles.filterInput
    const classNameBadge = dataIsFiltered ? styles.badgeWithActiveFilter : styles.badge
    const geschaeftPath = `/geschaefte/${activeId}`
    const showPrint = pages && pages[0] && pages[0].geschaefte && pages[0].geschaefte.length > 0

    console.log('components/Navbar, render, buildingPages', buildingPages)

    return (
      <div>
        {willDeleteGeschaeft && <ModalGeschaeftDelete />}
        {buildingPages && <ModalMessage message="Die Seiten werden aufgebaut..." />}
        <Navbar inverse fluid className={styles.navbar}>
          <Nav>
            <LinkContainer to={{ pathname: '/geschaefte' }}>
              <NavItem eventKey={1} href="#">
                Geschäfte <Badge className={classNameBadge}>{geschaefteGefiltert.length}</Badge>
              </NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: geschaeftPath }} disabled = {!activeId}>
              <NavItem eventKey={2} href="#" disabled = {!activeId}>Geschäft</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/filter' }}>
              <NavItem eventKey={3} href="#">Filter</NavItem>
            </LinkContainer>
            <NavItem
              eventKey={4}
              onClick={() => erstelleNeuesGeschaeft()}
              title="neues Geschäft"
            >
              <Glyphicon glyph="plus" />
            </NavItem>
            <NavItem
              eventKey = {5}
              onClick = {() => willGeschaeftEntfernen(activeId)}
              title = "Geschäft löschen"
              disabled = {!activeId}
            >
              <Glyphicon glyph = "trash" />
            </NavItem>
            <NavDropdown eventKey={6} title="Berichte" id="basic-nav-dropdown">
              {/* TODO: react-bootstrap has an error causing the dropdown to stay open and the message modal not to show!!!! */}
              <MenuItem eventKey={6.1} onSelect={() => pagesInitiate()}>Fristen</MenuItem>
            </NavDropdown>
            {showPrint && this.printNav()}
          </Nav>
          <Nav pullRight>
            <Navbar.Form pullLeft>
              <Input
                type="text"
                placeholder="Volltext filtern"
                value={filterFulltext}
                onChange={this.onChangeFilterFulltext}
                onKeyPress={this.onKeyPressFilterFulltext}
                className={classNameFilterInput}
                title="Zum Filtern drücken Sie die Enter-Taste"
              />
            <Glyphicon
              glyph="remove"
              onClick={this.onClickRemoveFilterGlyph}
              className={styles.filterInputRemoveIcon}
              title="Filter entfernen"
            />
            </Navbar.Form>
            <NavDropdown eventKey={8} title="Menu" id="basic-nav-dropdown">
              <MenuItem eventKey={8.1} onClick={holenDb}>Datenbank wählen</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default NavbarComponent
