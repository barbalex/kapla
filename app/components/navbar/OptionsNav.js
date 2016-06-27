'use strict'

import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem
} from 'react-bootstrap'

const NavbarOptionsNav = ({ dbGet }) =>
  <NavDropdown
    title="&#8942;"
    id="last-nav-dropdown"
    noCaret
  >
    <MenuItem
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
