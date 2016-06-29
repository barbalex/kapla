'use strict'

import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem,
} from 'react-bootstrap'

const OptionsNav = ({ dbGet, configUiReset }) =>
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
    <MenuItem
      onClick={configUiReset}
    >
      Einstellungen zurücksetzen
    </MenuItem>
  </NavDropdown>

OptionsNav.displayName = 'OptionsNav'

OptionsNav.propTypes = {
  dbGet: PropTypes.func.isRequired,
  configUiReset: PropTypes.func.isRequired,
}

export default OptionsNav
