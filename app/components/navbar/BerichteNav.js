'use strict'

import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem
} from 'react-bootstrap'
import styles from './Navbar.css'
import filterForVernehmlAngek from '../../src/filterForVernehmlAngek'
import filterForVernehmlLaeuft from '../../src/filterForVernehmlLaeuft'

const NavbarBerichteNav = ({
  pagesInitiate,
  path,
  pages,
  geschaefteFilterByFields
}) => {
  const isActive = path === '/pages'
  const nameObject = {
    FaelligeGeschaefte: 'Bericht: Typ "fällige Geschäfte"',
    List1: 'Bericht: Einfache Liste',
    vernehmlassung: 'Bericht: Vernehmlassungen'
  }
  const name = nameObject[pages.reportType] || 'Berichte'
  const title = isActive ? name : 'Berichte'
  return (
    <NavDropdown
      eventKey={7}
      title={title}
      id="reports-nav-dropdown"
      active={isActive}
      className={isActive ? styles.navActive : null}
      onSelect={(eventKey) => {
        /*
         * react-bootstrap has an error causing the dropdown to stay open
         * and the message modal not to show!!!!
         *
         * this is an elaborate hack
         * to get the menu item to close immediately
         */
        if (eventKey === 7.1) {
          setTimeout(() => {
            pagesInitiate('FaelligeGeschaefte')
          }, 0)
        }
        if (eventKey === 7.2) {
          setTimeout(() => {
            pagesInitiate('List1')
          }, 0)
        }
        if (eventKey === 7.3) {
          setTimeout(() => {
            geschaefteFilterByFields(filterForVernehmlAngek(), 'angekündigte Vernehmlassungen')
            pagesInitiate('FaelligeGeschaefte')
          }, 0)
        }
        if (eventKey === 7.4) {
          setTimeout(() => {
            geschaefteFilterByFields(filterForVernehmlLaeuft(), 'laufende Vernehmlassungen')
            pagesInitiate('FaelligeGeschaefte')
          }, 0)
        }
      }}
    >
      <MenuItem header>
        Vorlagen,<br />übernehmen den gesetzten Filter:
      </MenuItem>
      <MenuItem eventKey={7.1}>
        Typ "fällige Geschäfte"
      </MenuItem>
      <MenuItem eventKey={7.2}>
        Einfache Liste
      </MenuItem>
      <MenuItem divider />
      <MenuItem header>
        Pfannenfertige,<br />setzen einen eigenen Filter:
      </MenuItem>
      <MenuItem eventKey={7.3}>
        angekündigte Vernehmlassungen
      </MenuItem>
      <MenuItem eventKey={7.4}>
        laufende Vernehmlassungen
      </MenuItem>
    </NavDropdown>
  )
}

NavbarBerichteNav.displayName = 'NavbarBerichteNav'

NavbarBerichteNav.propTypes = {
  geschaefteFilterByFields: PropTypes.func.isRequired,
  pagesInitiate: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  pages: PropTypes.object.isRequired
}

export default NavbarBerichteNav
