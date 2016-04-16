'use strict'

import { remote } from 'electron'
const { dialog } = remote
import fs from 'fs'
import React, { Component, PropTypes } from 'react'
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
import moment from 'moment'
import ModalGeschaeftDelete from '../containers/ModalGeschaeftDelete.js'
import ModalMessage from '../containers/ModalMessage.js'
import styles from './Navbar.css'
import exportGeschaefte from '../src/exportGeschaefte.js'

class NavbarComponent extends Component {
  static propTypes = {
    holenDb: PropTypes.func.isRequired,
    setzeGeschaefteVolltextFilter: PropTypes.func.isRequired,
    filtereGeschaefteNachVolltext: PropTypes.func.isRequired,
    filtereGeschaefteNachFeldern: PropTypes.func.isRequired,
    username: PropTypes.string,
    erstelleNeuesGeschaeft: PropTypes.func.isRequired,
    willGeschaeftEntfernen: PropTypes.func.isRequired,
    activeId: PropTypes.number,
    filterFulltext: PropTypes.string,
    geschaefte: PropTypes.array.isRequired,
    geschaefteGefiltert: PropTypes.array.isRequired,
    showMessageModal: PropTypes.bool.isRequired,
    fetchUsername: PropTypes.func.isRequired,
    holeDbAusConfig: PropTypes.func.isRequired,
    holenGeschaefte: PropTypes.func.isRequired,
    holenRechtsmittelerledigungOptions: PropTypes.func.isRequired,
    holenParlVorstossTypOptions: PropTypes.func.isRequired,
    holenStatusOptions: PropTypes.func.isRequired,
    holenGeschaeftsartOptions: PropTypes.func.isRequired,
    willDeleteGeschaeft: PropTypes.bool.isRequired,
    pagesInitiate: PropTypes.func.isRequired,
    navbarVisible: PropTypes.bool.isRequired,
    hideNavbar: PropTypes.func.isRequired,
    showNavbar: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    showMessage: PropTypes.func.isRequired
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

  exportGeschaefte = (e) => {
    const { geschaefteGefiltert, showMessage } = this.props
    e.preventDefault()
    exportGeschaefte(geschaefteGefiltert, showMessage)
  }

  onSelectFilterFaelligeGeschaefte = (e) => {
    const { filtereGeschaefteNachFeldern, username } = this.props
    e.preventDefault()
    const now = moment().format('YYYY-MM-DD')
    const filter = {
      status: {
        value: 'zurückgestellt',
        comparator: '!=='
      },
      status: {
        value: 'erledigt',
        comparator: '!=='
      },
      datumAusgangAwel: {
        value: null,
        comparator: '='
      },
      fristMitarbeiter: {
        value: now,
        comparator: '<'
      }
    }
    filtereGeschaefteNachFeldern(filter)
    // TODO: add ordering to state and call action here to order by frist desc
  }

  onSelectFilterFaelligeGeschaefteMitarbeiter = (e) => {
    const { filtereGeschaefteNachFeldern, username } = this.props
    e.preventDefault()
    const now = moment().format('YYYY-MM-DD')
    const filter = {
      status: {
        value: 'zurückgestellt',
        comparator: '!=='
      },
      status: {
        value: 'erledigt',
        comparator: '!=='
      },
      datumAusgangAwel: {
        value: null,
        comparator: '='
      },
      fristMitarbeiter: {
        value: now,
        comparator: '<'
      },
      itKonto: username
    }
    filtereGeschaefteNachFeldern(filter)
    // TODO: add ordering to state and call action here to order by frist desc
  }

  render() {
    const {
      holenDb,
      activeId,
      geschaefte,
      geschaefteGefiltert,
      showMessageModal,
      filterFulltext,
      willDeleteGeschaeft,
      navbarVisible,
      pagesInitiate,
      erstelleNeuesGeschaeft,
      willGeschaeftEntfernen,
      path
    } = this.props

    if (!navbarVisible) return null

    const dataIsFiltered = geschaefte.length !== geschaefteGefiltert.length
    const dataIsFilteredStyle = [styles.filterInput, styles.filterInputActive].join(' ')
    const classNameFilterInput = dataIsFiltered ? dataIsFilteredStyle : styles.filterInput
    const classNameBadge = dataIsFiltered ? styles.badgeWithActiveFilter : styles.badge
    const geschaeftPath = `/geschaefte/${activeId}`
    const showPrint = path === '/pages'

    return (
      <div>
        {willDeleteGeschaeft && <ModalGeschaeftDelete />}
        {showMessageModal && <ModalMessage />}
        <Navbar inverse fluid className={styles.navbar}>
          <Nav>
            <LinkContainer to={{ pathname: '/geschaefte' }}>
              <NavItem eventKey={1} href="#">
                Geschäfte <Badge className={classNameBadge}>{geschaefteGefiltert.length}</Badge>
              </NavItem>
            </LinkContainer>
            <NavDropdown
              eventKey={3}
              title="Filter"
              id="basic-nav-dropdown"
            >
              <LinkContainer to={{ pathname: '/filter' }}>
                <MenuItem eventKey={3.1}>nach Feldern</MenuItem>
              </LinkContainer>
              <MenuItem eventKey={3.2} onSelect={this.onSelectFilterFaelligeGeschaefte}>fällige</MenuItem>
              <MenuItem eventKey={3.3} onSelect={this.onSelectFilterFaelligeGeschaefteMitarbeiter}>eigene fällige</MenuItem>
            </NavDropdown>
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
            <NavItem
              eventKey={6}
              onClick={this.exportGeschaefte}
              title="Geschäfte exportieren"
            >
              <Glyphicon glyph="share" />
            </NavItem>
            <NavDropdown
              eventKey={7}
              title="Berichte"
              id="basic-nav-dropdown"
              onSelect={(a, b) => {
                /*
                 * react-bootstrap has an error causing the dropdown to stay open
                 * and the message modal not to show!!!!
                 *
                 * this is an elaborate hack
                 * to get the menu item to close immediately
                 */
                if (b === 7.1) {
                  setTimeout(() => {
                    pagesInitiate()
                  }, 0)
                }
              }}
            >
              <MenuItem eventKey={7.1}>Fristen</MenuItem>
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
