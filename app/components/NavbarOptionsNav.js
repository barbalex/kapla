'use strict'

import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem
} from 'react-bootstrap'

const NavbarOptionsNav = ({ dbGet }) =>
  <NavDropdown
    eventKey={9}
    title="&#8942;"
    id="basic-nav-dropdown"
    noCaret
  >
    <MenuItem
      eventKey={9.1}
      onClick={dbGet}
    >
      Datenbank wählen
    </MenuItem>
  </NavDropdown>

NavbarOptionsNav.displayName = 'NavbarOptionsNav'

NavbarOptionsNav.propTypes = {
  dbGet: PropTypes.func.isRequired
}

export default NavbarOptionsNav
