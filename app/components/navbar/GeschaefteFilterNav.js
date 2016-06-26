'use strict'

import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import moment from 'moment'
import filterForFaelligeGeschaefte from '../../src/filterForFaelligeGeschaefte'
import filterForVernehmlAngek from '../../src/filterForVernehmlAngek'
import filterForVernehmlLaeuft from '../../src/filterForVernehmlLaeuft'
import styles from './Navbar.css'

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

const onSelectFilterVernehmlAngek = (geschaefteFilterByFields) => {
  const filter = filterForVernehmlAngek()
  geschaefteFilterByFields(filter, 'angekündigte Vernehmlassungen')
}

const onSelectFilterVernehmlLaeuft = (geschaefteFilterByFields) => {
  const filter = filterForVernehmlLaeuft()
  geschaefteFilterByFields(filter, 'laufende Vernehmlassungen')
}

const NavbarGeschaefteFilterNav = ({
  filterType,
  geschaefte,
  geschaefteGefilterteIds,
  focusFulltextFilter,
  removeFilter,
  geschaefteFilterByFields,
  username
}) => {
  const dataIsFiltered = geschaefte.length !== geschaefteGefilterteIds.length
  const classNameNavDropdown = dataIsFiltered ? styles.active : null
  return (
    <NavDropdown
      eventKey={3}
      title={filterType ? `Filter: ${filterType}` : 'Filter: alle'}
      id="filter-nav-dropdown"
      className={classNameNavDropdown}
    >
      <MenuItem header>
        individuell:
      </MenuItem>
      <LinkContainer to={{ pathname: '/filterFields' }}>
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
          onSelectFilterVernehmlAngek(geschaefteFilterByFields)
        }
      >
        angekündigte Vernehmlassungen
      </MenuItem>
      <MenuItem
        eventKey={3.6}
        onSelect={() =>
          onSelectFilterVernehmlLaeuft(geschaefteFilterByFields)
        }
      >
        laufende Vernehmlassungen
      </MenuItem>
      <MenuItem divider />
      <MenuItem
        eventKey={3.7}
        onSelect={() =>
          removeFilter()
        }
      >
        Filter entfernen
      </MenuItem>
    </NavDropdown>
  )
}

NavbarGeschaefteFilterNav.displayName = 'NavbarGeschaefteFilterNav'

NavbarGeschaefteFilterNav.propTypes = {
  filterType: PropTypes.string,
  geschaefte: PropTypes.array.isRequired,
  geschaefteGefilterteIds: PropTypes.array.isRequired,
  username: PropTypes.string,
  focusFulltextFilter: PropTypes.func.isRequired,
  geschaefteFilterByFields: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired
}

export default NavbarGeschaefteFilterNav
