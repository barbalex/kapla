'use strict'

import { remote } from 'electron'
import ReactDOM from 'react-dom'
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
  FormGroup,
  FormControl
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import moment from 'moment'
import _ from 'lodash'
import ModalGeschaeftDelete from '../containers/ModalGeschaeftDelete'
import ModalMessage from '../containers/ModalMessage'
import NavbarBerichteNav from '../containers/NavbarBerichteNav'
import styles from './Navbar.css'
import exportGeschaefte from '../src/exportGeschaefte'
import filterForFaelligeGeschaefte from '../src/filterForFaelligeGeschaefte'
import filterForAngekVernehml from '../src/filterForAngekVernehml'

class NavbarBerichteNav extends Component {
  static propTypes = {
    dbGet: PropTypes.func.isRequired,
    geschaefteFilterByFulltextSet: PropTypes.func.isRequired,
    geschaefteFilterByFulltext: PropTypes.func.isRequired,
    geschaefteFilterByFields: PropTypes.func.isRequired,
    username: PropTypes.string,
    geschaeftNewCreate: PropTypes.func.isRequired,
    geschaeftSetDeleteIntended: PropTypes.func.isRequired,
    activeId: PropTypes.number,
    filterFulltext: PropTypes.string,
    filterType: PropTypes.string,
    geschaefte: PropTypes.array.isRequired,
    geschaefteGefilterteIds: PropTypes.array.isRequired,
    showMessageModal: PropTypes.bool.isRequired,
    dbGetFromConfig: PropTypes.func.isRequired,
    willDeleteGeschaeft: PropTypes.bool.isRequired,
    pagesInitiate: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    messageShow: PropTypes.func.isRequired,
    getTable: PropTypes.func.isRequired,
    table: PropTypes.string,
    rows: PropTypes.array,
    activeTableRowId: PropTypes.number,
    rowNewCreate: PropTypes.func.isRequired,
    tableRowRemove: PropTypes.func.isRequired,
    pages: PropTypes.object.isRequired
  }

  render() {
    const { filterType } = this.props
    return (
      <NavDropdown
        eventKey={3}
        title={filterType ? `Filter: ${filterType}` : 'Filter'}
        id="filter-nav-dropdown"
      >
        <MenuItem header>
          individuell:
        </MenuItem>
        <LinkContainer to={{ pathname: '/filter' }}>
          <MenuItem eventKey={3.1}>
            nach Feldern
          </MenuItem>
        </LinkContainer>
        <MenuItem
          eventKey={3.2}
          onSelect={this.focusFulltextFilter}
        >
          nach Volltext
        </MenuItem>
        <MenuItem divider />
        <MenuItem header>
          pfannenfertig:
        </MenuItem>
        <MenuItem
          eventKey={3.3}
          onSelect={this.onSelectFilterFaelligeGeschaefte}
        >
          fällige
        </MenuItem>
        <MenuItem
          eventKey={3.4}
          onSelect={this.onSelectFilterFaelligeGeschaefteMitarbeiter}
        >
          eigene fällige
        </MenuItem>
        <MenuItem
          eventKey={3.5}
          onSelect={this.onSelectFilterAngekVernehml}
        >
          angekündigte Vernehmlassungen
        </MenuItem>
        <MenuItem divider />
        <MenuItem
          eventKey={3.5}
          onSelect={this.removeFilter}
        >
          Filter entfernen
        </MenuItem>
      </NavDropdown>
    )
  }
}

export default NavbarBerichteNav
