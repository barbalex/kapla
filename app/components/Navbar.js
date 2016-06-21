'use strict'

import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import {
  Navbar,
  NavDropdown,
  MenuItem,
  Nav,
  NavItem,
  Glyphicon,
  FormGroup,
  FormControl
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ModalGeschaeftDelete from '../containers/ModalGeschaeftDelete'
import ModalMessage from '../containers/ModalMessage'
import NavbarBerichteNav from '../containers/NavbarBerichteNav'
import NavbarGeschaefteFilterNav from '../containers/NavbarGeschaefteFilterNav'
import NavbarGeschaeftNeuNav from '../containers/NavbarGeschaeftNeuNav'
import NavbarGeschaeftLoeschenNav from '../containers/NavbarGeschaeftLoeschenNav'
import NavbarTableRowNeuNav from '../containers/NavbarTableRowNeuNav'
import NavbarTableRowDeleteNav from '../containers/NavbarTableRowDeleteNav'
import NavbarExportGeschaefteNav from '../containers/NavbarExportGeschaefteNav'
import NavbarPrintNav from './NavbarPrintNav.js'
import NavbarStammdatenNav from '../containers/NavbarStammdatenNav'
import styles from './Navbar.css'

class NavbarComponent extends Component {
  static propTypes = {
    dbGet: PropTypes.func.isRequired,
    geschaefteFilterByFulltextSet: PropTypes.func.isRequired,
    geschaefteFilterByFulltext: PropTypes.func.isRequired,
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
    const { geschaefteFilterByFulltextSet } = this.props
    geschaefteFilterByFulltextSet(e.target.value)
  }

  onKeyPressFilterFulltext = (e) => {
    const { geschaefteFilterByFulltext } = this.props
    if (e.key === 'Enter') {
      geschaefteFilterByFulltext()
    }
  }

  removeFilter = () => {
    const {
      geschaefteFilterByFulltextSet,
      geschaefteFilterByFulltext
    } = this.props
    const filterFulltext = ''
    geschaefteFilterByFulltextSet(filterFulltext)
    geschaefteFilterByFulltext(null)
    this.focusFulltextFilter()
  }

  fulltextFilterNav = () => {
    const {
      filterFulltext,
      geschaefte,
      geschaefteGefilterteIds
    } = this.props
    const dataIsFiltered = geschaefte.length !== geschaefteGefilterteIds.length
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
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Volltext filtern"
            value={filterFulltext}
            onChange={this.onChangeFilterFulltext}
            onKeyPress={this.onKeyPressFilterFulltext}
            className={classNameFilterInput}
            title="Zum Filtern drücken Sie die Enter-Taste"
            ref="filterFulltext"
          />
        </FormGroup>
        <Glyphicon
          glyph="remove"
          onClick={this.removeFilter}
          className={styles.filterInputRemoveIcon}
          title="Filter entfernen"
        />
      </Navbar.Form>
    )
  }

  focusFulltextFilter = () => {
    ReactDOM.findDOMNode(this.refs.filterFulltext).focus()
  }

  render() {
    const {
      dbGet,
      geschaefte,
      geschaefteGefilterteIds,
      showMessageModal,
      willDeleteGeschaeft,
      path
    } = this.props

    const dataIsFiltered = geschaefte.length !== geschaefteGefilterteIds.length
    const classNameBadge = dataIsFiltered ? styles.badgeWithActiveFilter : null
    const showPrint = path === '/pages'
    const showGeschaefteStuff = path === '/geschaefte'
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
              showGeschaefteStuff &&
              <NavbarGeschaefteFilterNav
                focusFulltextFilter={this.focusFulltextFilter}
                removeFilter={this.removeFilter}
              />
            }
            {
              showGeschaefteStuff &&
              <NavbarGeschaeftNeuNav />
            }
            {
              showGeschaefteStuff &&
              <NavbarGeschaeftLoeschenNav />
            }
            {
              showGeschaefteAndPrint &&
              <NavbarExportGeschaefteNav />
            }
            {
              showGeschaefteAndPrint &&
              <NavbarBerichteNav />
            }
            {
              showPrint &&
              <NavbarPrintNav />
            }
            <NavbarStammdatenNav />
            {
              showTableStuff &&
              <NavbarTableRowNeuNav />
            }
            {
              showTableStuff &&
              <NavbarTableRowDeleteNav />
            }
          </Nav>
          <Nav pullRight>
            {
              showGeschaefteAndPrint &&
              this.fulltextFilterNav()
            }
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
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default NavbarComponent
