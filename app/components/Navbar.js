'use strict'

import { remote } from 'electron'
import ReactDOM from 'react-dom'
const { dialog } = remote
import fs from 'fs'
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

  onClickPrint = (e) => {
    e.preventDefault()
    const win = remote.getCurrentWindow()
    const printToPDFOptions = {
      marginsType: 1,
      pageSize: 'A4',
      landscape: true,
      printBackground: true
    }
    const dialogOptions = {
      title: 'pdf speichern',
      filters: [{ name: 'pdf', extensions: ['pdf'] }]
    }
    /* not working ?!
    win.webContents.print({ silent: false, printBackground: false }, (error, data) => {
      if (error) throw error
      console.log('data', data)
    })
    */
    // first remove navbar
    win.webContents.printToPDF(printToPDFOptions, (error, data) => {
      if (error) throw error
      dialog.showSaveDialog(dialogOptions, (path) => {
        if (path) {
          fs.writeFile(path, data, (err) => {
            if (err) throw err
          })
        }
      })
    })
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

  printNav = () => (
    <NavItem
      eventKey={7}
      onClick={this.onClickPrint}
      title="Drucken"
    >
      <Glyphicon glyph="print" />
    </NavItem>
  )

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

  stammdatenTitle = () => {
    const { table, rows } = this.props
    const tableNameObject = {
      interne: 'Interne',
      externe: 'Externe',
      gdeplz: 'Gemeinden',
      geschaeftsart: 'Geschäftsart',
      parlVorstossTyp: 'Parl. Vorstoss Typ',
      rechtsmittelInstanz: 'Rechtsmittel-Instanz',
      rechtsmittelErledigung: 'Rechtsmittel-Erledigung',
      status: 'Status'
    }
    const tableName = tableNameObject[table] || table
    if (table) {
      return (
        <span>
          {tableName} <sup>{rows.length}</sup>
        </span>
      )
    }
    return <span>Stammdaten</span>
  }

  render() {
    const {
      dbGet,
      geschaefte,
      geschaefteGefilterteIds,
      showMessageModal,
      willDeleteGeschaeft,
      path,
      getTable,
      table
    } = this.props

    const dataIsFiltered = geschaefte.length !== geschaefteGefilterteIds.length
    const classNameBadge = dataIsFiltered ? styles.badgeWithActiveFilter : null
    const showPrint = path === '/pages'
    const showGeschaefteStuff = path === '/geschaefte'
    const showGeschaefteAndPrint = showPrint || showGeschaefteStuff
    const showTableStuff = path === '/table'
    /**
     * does not work - should keep menu active when table is loaded
     * probably a bug in react-bootstrap
     * see: https://github.com/react-bootstrap/react-bootstrap/issues/1878
     */
    const isStammdatenMenuActive = !!table

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
              <NavbarGeschaefteFilterNav focusFulltextFilter={this.focusFulltextFilter} removeFilter={this.removeFilter} />
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
              this.printNav()
            }
            <NavDropdown
              eventKey={8}
              title={this.stammdatenTitle()}
              id="basic-nav-dropdown"
              active={isStammdatenMenuActive}
              className={isStammdatenMenuActive ? styles.navActive : null}
            >
              <MenuItem
                eventKey={8.1}
                onClick={() => getTable('interne')}
                active={table === 'interne'}
              >
                Interne
              </MenuItem>
              <MenuItem
                eventKey={8.2}
                onClick={() => getTable('externe')}
                active={table === 'externe'}
              >
                Externe
              </MenuItem>
              <MenuItem divider />
              <MenuItem header>
                Auswahllisten:
              </MenuItem>
              <MenuItem
                eventKey={8.3}
                onClick={() => getTable('gdeplz')}
                active={table === 'gdeplz'}
              >
                Gemeinden
              </MenuItem>
              <MenuItem
                eventKey={8.4}
                onClick={() => getTable('geschaeftsart')}
                active={table === 'geschaeftsart'}
              >
                Geschäftsart
              </MenuItem>
              <MenuItem
                eventKey={8.6}
                onClick={() => getTable('parlVorstossTyp')}
                active={table === 'parlVorstossTyp'}
              >
                Parlament. Vorstoss Typ
              </MenuItem>
              <MenuItem
                eventKey={8.7}
                onClick={() => getTable('rechtsmittelInstanz')}
                active={table === 'rechtsmittelInstanz'}>

                Rechtsmittel-Instanz
              </MenuItem>
              <MenuItem
                eventKey={8.8}
                onClick={() => getTable('rechtsmittelErledigung')}
                active={table === 'rechtsmittelErledigung'}
              >
                Rechtsmittel-Erledigung
              </MenuItem>
              <MenuItem
                eventKey={8.9}
                onClick={() => getTable('status')}
                active={table === 'status'}
              >
                Status
              </MenuItem>
            </NavDropdown>
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
