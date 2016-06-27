'use strict'

import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import {
  MenuItem,
  Button,
  SplitButton,
  Navbar,
  Glyphicon,
  FormControl
} from 'react-bootstrap'
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

const FilterNav = ({
  filterFulltext,
  filterType,
  geschaefte,
  geschaefteGefilterteIds,
  geschaefteFilterByFields,
  username,
  geschaefteRemoveFilters,
  geschaefteFilterByFulltext,
  path,
  router
}) => {
  const dataIsFilteredByFulltext = (
    geschaefte.length !== geschaefteGefilterteIds.length &&
    filterFulltext
  )
  const dataIsFilteredByFields = (
    geschaefte.length !== geschaefteGefilterteIds.length &&
    !filterFulltext
  )
  const dataIsFiltered = (
    geschaefte.length !== geschaefteGefilterteIds.length
  )
  const dataIsFilteredByFulltextStyle = [
    styles.filterInput,
    styles.filterInputActive
  ].join(' ')
  const classNameFilterInput = (
    dataIsFilteredByFulltext ?
    dataIsFilteredByFulltextStyle :
    styles.filterInput
  )
  const activeFiltercriteria = (
    dataIsFilteredByFields ?
    'TODO' :
    '(kein Filter aktiv)'
  )
  return (
    <Navbar.Form
      pullLeft
      className={styles.filterGroupContainer}
    >
      <div className={styles.filterGroup}>
        <FormControl
          type="text"
          placeholder="Volltext filtern"
          value={filterFulltext}
          onChange={(e) =>
            geschaefteFilterByFulltext(e.target.value)
          }
          className={classNameFilterInput}
          title="Zum Filtern drücken Sie die Enter-Taste"
        />
        <SplitButton
          id="field-filter-dropdown"
          title="Felder filtern"
          className={styles.fieldFilterDropdown}
          style={{ backgroundColor: dataIsFilteredByFields ? '#FFBF73' : null }}
          onClick={() => {
            if (path !== '/filterFields') {
              router.push('/filterFields')
            }
          }}
        >
          <MenuItem header>
            aktive Filterkriterien:
          </MenuItem>
          <MenuItem header>
            {activeFiltercriteria}
          </MenuItem>
          <MenuItem header>
            vorbereitete Filter:
          </MenuItem>
          <MenuItem
            onSelect={() =>
              onSelectFilterFaelligeGeschaefte(geschaefteFilterByFields)
            }
            style={{
              backgroundColor: (
                filterType === 'fällige' ?
                '#FFBF73' :
                null
              )
            }}
          >
            fällige Geschäfte
          </MenuItem>
          <MenuItem
            onSelect={() =>
              onSelectFilterFaelligeGeschaefteMitarbeiter(geschaefteFilterByFields, username)
            }
            style={{
              backgroundColor: (
                filterType === 'eigene fällige' ?
                '#FFBF73' :
                null
              )
            }}
          >
            eigene fällige Geschäfte
          </MenuItem>
          <MenuItem
            onSelect={() =>
              onSelectFilterVernehmlAngek(geschaefteFilterByFields)
            }
            style={{
              backgroundColor: (
                filterType === 'angekündigte Vernehmlassungen' ?
                '#FFBF73' :
                null
              )
            }}
          >
            angekündigte Vernehmlassungen
          </MenuItem>
          <MenuItem
            onSelect={() =>
              onSelectFilterVernehmlLaeuft(geschaefteFilterByFields)
            }
            style={{
              backgroundColor: (
                filterType === 'laufende Vernehmlassungen' ?
                '#FFBF73' :
                null
              )
            }}
          >
            laufende Vernehmlassungen
          </MenuItem>
        </SplitButton>
        <Button
          disabled={!dataIsFiltered}
          className={styles.filterRemoveButton}
        >
          <Glyphicon
            glyph="remove"
            onClick={() =>
              geschaefteRemoveFilters()
            }
            title="Filter entfernen"
          />
        </Button>
      </div>
    </Navbar.Form>
  )
}

FilterNav.displayName = 'FilterNav'

FilterNav.propTypes = {
  filterType: PropTypes.string,
  geschaefte: PropTypes.array.isRequired,
  geschaefteGefilterteIds: PropTypes.array.isRequired,
  geschaefteFilterByFields: PropTypes.func.isRequired,
  geschaefteFilterByFulltext: PropTypes.func.isRequired,
  geschaefteRemoveFilters: PropTypes.func.isRequired,
  filterFulltext: PropTypes.string,
  username: PropTypes.string,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  path: PropTypes.string.isRequired
}

export default withRouter(FilterNav)
