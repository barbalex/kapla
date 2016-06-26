'use strict'

import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import {
  MenuItem,
  SplitButton,
  Navbar,
  Glyphicon,
  FormControl
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

class NavbarComponent extends Component {
  static propTypes = {
    filterType: PropTypes.string,
    geschaefte: PropTypes.array.isRequired,
    geschaefteGefilterteIds: PropTypes.array.isRequired,
    geschaefteFilterByFields: PropTypes.func.isRequired,
    geschaefteFilterByFulltext: PropTypes.func.isRequired,
    geschaefteRemoveFilters: PropTypes.func.isRequired,
    filterFulltext: PropTypes.string,
    username: PropTypes.string
  }

  onChangeFilterFulltext = (e) => {
    const { geschaefteFilterByFulltext } = this.props
    geschaefteFilterByFulltext(e.target.value)
  }

  removeFilter = () => {
    const { geschaefteRemoveFilters } = this.props
    geschaefteRemoveFilters()
    this.focusFulltextFilter()
  }

  focusFulltextFilter = () => {
    ReactDOM.findDOMNode(this.refs.filterFulltext).focus()
  }

  render() {
    const {
      filterFulltext,
      geschaefte,
      geschaefteGefilterteIds,
      geschaefteFilterByFields,
      username
    } = this.props
    const dataIsFiltered = (
      geschaefte.length !== geschaefteGefilterteIds.length &&
      filterFulltext
    )
    const dataIsFilteredStyle = [
      styles.filterInput,
      styles.filterInputActive
    ].join(' ')
    const classNameFilterInput = (
      dataIsFiltered ?
      dataIsFilteredStyle :
      styles.filterInput
    )
    return (
      <Navbar.Form
        pullLeft
        className={styles.filterGroupContainer}
      >
        <div className={styles.filterGroup}>
          <div className={styles.fulltextFilterContainer}>
            <FormControl
              type="text"
              placeholder="Volltext filtern"
              value={filterFulltext}
              onChange={this.onChangeFilterFulltext}
              className={classNameFilterInput}
              title="Zum Filtern drücken Sie die Enter-Taste"
              ref="filterFulltext"
            />
            <Glyphicon
              glyph="remove"
              onClick={this.removeFilter}
              className={styles.filterInputRemoveIcon}
              title="Filter entfernen"
            />
          </div>
          <SplitButton
            id="field-filter-dropdown"
            title="Felder filtern"
            className={styles.fieldFilterDropdown}
            onClick={() => console.log('SplitButton clicked')}
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
                this.focusFulltextFilter()
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
                this.removeFilter()
              }
            >
              Filter entfernen
            </MenuItem>
          </SplitButton>
        </div>
      </Navbar.Form>
    )
  }
}

export default NavbarComponent
