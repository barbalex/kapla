'use strict'

import React, { PropTypes } from 'react'
import {
  NavItem,
  Glyphicon
} from 'react-bootstrap'

const NavbarTableRowDeleteNav = ({
  tableRowRemove,
  table,
  activeTableRowId
}) =>
  <NavItem
    eventKey={5}
    onClick={() =>
      tableRowRemove(table, activeTableRowId)
    }
    title="Datensatz löschen"
    disabled={!activeTableRowId}
  >
    <Glyphicon glyph="trash" />
  </NavItem>

NavbarTableRowDeleteNav.displayName = 'NavbarTableRowDeleteNav'

NavbarTableRowDeleteNav.propTypes = {
  table: PropTypes.string,
  activeTableRowId: PropTypes.number,
  tableRowRemove: PropTypes.func.isRequired
}

export default NavbarTableRowDeleteNav
