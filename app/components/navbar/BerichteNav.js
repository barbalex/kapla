'use strict'

import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem
} from 'react-bootstrap'
import styles from './Navbar.css'
import filterForAngekVernehml from '../../src/filterForAngekVernehml'

const NavbarBerichteNav = ({
  pagesInitiate,
  path,
  pages,
  geschaefteFilterByFields
}) => {
  const isActive = path === '/pages'
  const nameObject = {
    Fristen: 'Bericht: Fristen',
    List1: 'Bericht: Einfache Liste',
    vernehmlAngek: 'Bericht: Vernehmlassungen'
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
            pagesInitiate('Fristen')
          }, 0)
        }
        if (eventKey === 7.2) {
          setTimeout(() => {
            pagesInitiate('List1')
          }, 0)
        }
        if (eventKey === 7.3) {
          setTimeout(() => {
            geschaefteFilterByFields(filterForAngekVernehml(), 'angekündigte Vernehmlassungen')
            pagesInitiate('vernehmlAngek')
          }, 0)
        }
      }}
    >
      <MenuItem header>
        Berichte, die den gesetzten Filter übernehmen:
      </MenuItem>
      <MenuItem eventKey={7.1}>
        Fristen
      </MenuItem>
      <MenuItem eventKey={7.2}>
        Einfache Liste
      </MenuItem>
      <MenuItem divider />
      <MenuItem header>
        Berichte, welche einen eigenen Filter setzen:
      </MenuItem>
      <MenuItem eventKey={7.3}>
        angekündigte Vernehmlassungen
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
