'use strict'

import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import moment from 'moment'
import filterForFaelligeGeschaefte from '../src/filterForFaelligeGeschaefte'
import filterForAngekVernehml from '../src/filterForAngekVernehml'

const onSelectFilterFaelligeGeschaefte = (geschaefteFilterByFields) => {
  const filter = filterForFaelligeGeschaefte()
  geschaefteFilterByFields(filter, 'fällige')
  // TODO: add ordering to state and call action here to order by frist desc
}

const onSelectFilterFaelligeGeschaefteMitarbeiter = (
  geschaefteFilterByFields,
  username
) => {
  const now = moment().format('YYYY-MM-DD')
  const filter = [
    {
      field: 'fristMitarbeiter',
      value: now,
      comparator: '<'
    },
    {
      field: 'mutationsperson',
      value: username,
      comparator: '==='
    }
  ]
  geschaefteFilterByFields(filter, 'eigene fällige')
  // TODO: add ordering to state and call action here to order by frist desc
}

const onSelectFilterAngekVernehml = (geschaefteFilterByFields) => {
  const filter = filterForAngekVernehml()
  geschaefteFilterByFields(filter, 'angekündigte Vernehmlassungen')
}

const NavbarGeschaefteFilterNav = ({
  filterType,
  focusFulltextFilter,
  removeFilter,
  geschaefteFilterByFields,
  username
}) =>
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
      onSelect={() =>
        focusFulltextFilter()
      }
    >
      nach Volltext
    </MenuItem>
    <MenuItem divider />
    <MenuItem header>
      pfannenfertig:
    </MenuItem>
    <MenuItem
      eventKey={3.3}
      onSelect={() =>
        onSelectFilterFaelligeGeschaefte(geschaefteFilterByFields)
      }
    >
      fällige
    </MenuItem>
    <MenuItem
      eventKey={3.4}
      onSelect={() =>
        onSelectFilterFaelligeGeschaefteMitarbeiter(geschaefteFilterByFields, username)
      }
    >
      eigene fällige
    </MenuItem>
    <MenuItem
      eventKey={3.5}
      onSelect={() =>
        onSelectFilterAngekVernehml(geschaefteFilterByFields)
      }
    >
      angekündigte Vernehmlassungen
    </MenuItem>
    <MenuItem divider />
    <MenuItem
      eventKey={3.5}
      onSelect={() =>
        removeFilter()
      }
    >
      Filter entfernen
    </MenuItem>
  </NavDropdown>

NavbarGeschaefteFilterNav.displayName = 'NavbarGeschaefteFilterNav'

NavbarGeschaefteFilterNav.propTypes = {
  filterType: PropTypes.string,
  username: PropTypes.string,
  focusFulltextFilter: PropTypes.func.isRequired,
  geschaefteFilterByFields: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired
}

export default NavbarGeschaefteFilterNav
