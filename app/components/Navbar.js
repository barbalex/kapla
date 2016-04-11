'use strict'

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

  render() {
    const {
      holenDb,
      activeId,
      geschaefte,
      geschaefteGefiltert,
      filterFulltext,
      willDeleteGeschaeft
    } = this.props

    const dataIsFiltered = geschaefte.length !== geschaefteGefiltert.length
    const dataIsFilteredStyle = [styles.filterInput, styles.filterInputActive].join(' ')
    const classNameFilterInput = dataIsFiltered ? dataIsFilteredStyle : styles.filterInput
    const classNameBadge = dataIsFiltered ? styles.badgeWithActiveFilter : styles.badge
    const geschaeftPath = `/geschaefte/${activeId}`
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
            <NavDropdown eventKey={7} title="Menu" id="basic-nav-dropdown">
              <MenuItem eventKey={7.1} onClick={holenDb}>Datenbank wählen</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default NavbarComponent
