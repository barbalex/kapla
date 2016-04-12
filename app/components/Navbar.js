'use strict'

import { remote } from 'electron'
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
import ModalGeschaeftDelete from '../containers/ModalGeschaeftDelete.js'
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
    pagesInitiate: PropTypes.func.isRequired
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

  onClickNewGeschaeft = () => {
    const { erstelleNeuesGeschaeft } = this.props
    erstelleNeuesGeschaeft()
  }

  onClickDeleteGeschaeft = () => {
    const { willGeschaeftEntfernen, activeId } = this.props
    willGeschaeftEntfernen(activeId)
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

  onClickReportFristen = () => {
    const { pagesInitiate } = this.props
    pagesInitiate()
  }

  onClickPrint = (e) => {
    e.preventDefault()
    const win = remote.getCurrentWindow()
    console.log('win', win)
    // win.printToPDF()
    // win.print()
    /*win.webContents.print({ silent: false, printBackground: false }, function(error, data) {
      console.log('error', error)
      console.log('data', data)
    })*/
    win.webContents.printToPDF({ marginsType: 1, pageSize: 'A4', landscape: true }, (error, data) => {
      if (error) throw error
      fs.writeFile('/tmp/print.pdf', data, (err) => {
        if (err) throw err
        console.log('Write PDF successfully.')
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
      pages
    } = this.props

    const dataIsFiltered = geschaefte.length !== geschaefteGefiltert.length
    const dataIsFilteredStyle = [styles.filterInput, styles.filterInputActive].join(' ')
    const classNameFilterInput = dataIsFiltered ? dataIsFilteredStyle : styles.filterInput
    const classNameBadge = dataIsFiltered ? styles.badgeWithActiveFilter : styles.badge
    const geschaeftPath = `/geschaefte/${activeId}`
    const showPrint = pages && pages[0] && pages[0].geschaefte && pages[0].geschaefte.length > 0
    return (
      <div>
        {willDeleteGeschaeft && <ModalGeschaeftDelete />}
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
              onClick={this.onClickNewGeschaeft}
              title="neues Geschäft"
            >
              <Glyphicon glyph="plus" />
            </NavItem>
            <NavItem
              eventKey = {5}
              onClick = {this.onClickDeleteGeschaeft}
              title = "Geschäft löschen"
              disabled = {!activeId}
            >
              <Glyphicon glyph = "trash" />
            </NavItem>
            <NavDropdown eventKey={6} title="Berichte" id="basic-nav-dropdown">
              <MenuItem eventKey={6.1} onClick={this.onClickReportFristen}>Fristen</MenuItem>
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
