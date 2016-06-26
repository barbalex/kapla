'use strict'

import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import {
  ButtonGroup,
  MenuItem,
  SplitButton,
  Navbar,
  Nav,
  NavItem,
  Glyphicon,
  FormControl
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ModalGeschaeftDelete from '../../containers/ModalGeschaeftDelete'
import ModalMessage from '../../containers/ModalMessage'
import BerichteNav from '../../containers/navbar/BerichteNav'
import GeschaefteFilterNav from '../../containers/navbar/GeschaefteFilterNav'
import GeschaeftNeuNav from '../../containers/navbar/GeschaeftNewNav'
import GeschaeftLoeschenNav from '../../containers/navbar/GeschaeftDeleteNav'
import TableRowNeuNav from '../../containers/navbar/TableRowNewNav'
import TableRowDeleteNav from '../../containers/navbar/TableRowDeleteNav'
import ExportGeschaefteNav from '../../containers/navbar/ExportGeschaefteNav'
import PrintNav from './PrintNav.js'
import StammdatenNav from '../../containers/navbar/StammdatenNav'
import OptionsNav from '../../containers/navbar/OptionsNav'
import styles from './Navbar.css'

class NavbarComponent extends Component {
  static propTypes = {
    geschaefteFilterByFulltext: PropTypes.func.isRequired,
    geschaefteRemoveFilters: PropTypes.func.isRequired,
    filterFulltext: PropTypes.string,
    geschaefte: PropTypes.array.isRequired,
    geschaefteGefilterteIds: PropTypes.array.isRequired,
    showMessageModal: PropTypes.bool.isRequired,
    dbGetFromConfig: PropTypes.func.isRequired,
    willDeleteGeschaeft: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    getTable: PropTypes.func.isRequired,
    table: PropTypes.string,
    rows: PropTypes.array
  }

  componentWillMount() {
    const { dbGetFromConfig } = this.props
    dbGetFromConfig()
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

  fulltextFilterNav = () => {
    const {
      filterFulltext,
      geschaefte,
      geschaefteGefilterteIds
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
      <Navbar.Form pullLeft>
        <ButtonGroup>
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
          <SplitButton
            id="field-filter-dropdown"
            title="Filter"
          >
            <MenuItem eventKey="1">Action</MenuItem>
          </SplitButton>
        </ButtonGroup>
      </Navbar.Form>
    )
  }

  focusFulltextFilter = () => {
    ReactDOM.findDOMNode(this.refs.filterFulltext).focus()
  }

  render() {
    const {
      geschaefte,
      geschaefteGefilterteIds,
      showMessageModal,
      willDeleteGeschaeft,
      path
    } = this.props

    const dataIsFiltered = geschaefte.length !== geschaefteGefilterteIds.length
    const classNameBadge = dataIsFiltered ? styles.active : null
    const showPrint = path === '/pages'
    const showGeschaefteStuff = path === '/geschaefte' || path === '/filterFields'
    const showGeschaefteAndPrint = showPrint || showGeschaefteStuff
    const showTableStuff = path === '/table'

    return (
      <div>
        {
          willDeleteGeschaeft &&
          <ModalGeschaeftDelete />
        }
        {
          showMessageModal &&
          <ModalMessage />
        }
        <Navbar
          inverse
          fluid
          className={styles.navbar}
        >
          <Nav>
            <LinkContainer to={{ pathname: '/geschaefte' }}>
              <NavItem
                eventKey={1}
                href="#"
              >
                Geschäfte <sup className={classNameBadge}>{geschaefteGefilterteIds.length}</sup>
              </NavItem>
            </LinkContainer>
            {
              !showTableStuff &&
              <GeschaefteFilterNav
                focusFulltextFilter={this.focusFulltextFilter}
                removeFilter={this.removeFilter}
              />
            }
            {
              showGeschaefteStuff &&
              <GeschaeftNeuNav />
            }
            {
              showGeschaefteStuff &&
              <GeschaeftLoeschenNav />
            }
            {
              showGeschaefteAndPrint &&
              <ExportGeschaefteNav />
            }
            {
              showGeschaefteAndPrint &&
              <BerichteNav />
            }
            {
              showPrint &&
              <PrintNav />
            }
            <StammdatenNav />
            {
              showTableStuff &&
              <TableRowNeuNav />
            }
            {
              showTableStuff &&
              <TableRowDeleteNav />
            }
          </Nav>
          <Nav pullRight>
            {
              showGeschaefteAndPrint &&
              this.fulltextFilterNav()
            }
            <OptionsNav />
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default NavbarComponent
