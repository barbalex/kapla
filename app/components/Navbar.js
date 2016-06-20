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
import moment from 'moment'
import _ from 'lodash'
import ModalGeschaeftDelete from '../containers/ModalGeschaeftDelete'
import ModalMessage from '../containers/ModalMessage'
import styles from './Navbar.css'
import exportGeschaefte from '../src/exportGeschaefte'
import filterForFaelligeGeschaefte from '../src/filterForFaelligeGeschaefte'
import filterForAngekVernehml from '../src/filterForAngekVernehml'

class NavbarComponent extends Component {
  static propTypes = {
    dbGet: PropTypes.func.isRequired,
    geschaefteFilterByFulltextSet: PropTypes.func.isRequired,
    geschaefteFilterByFulltext: PropTypes.func.isRequired,
    geschaefteFilterByFields: PropTypes.func.isRequired,
    username: PropTypes.string,
    geschaeftNewCreate: PropTypes.func.isRequired,
    geschaeftSetDeleteIntended: PropTypes.func.isRequired,
    activeId: PropTypes.number,
    filterFulltext: PropTypes.string,
    filterType: PropTypes.string,
    geschaefte: PropTypes.array.isRequired,
    geschaefteGefilterteIds: PropTypes.array.isRequired,
    showMessageModal: PropTypes.bool.isRequired,
    dbGetFromConfig: PropTypes.func.isRequired,
    willDeleteGeschaeft: PropTypes.bool.isRequired,
    pagesInitiate: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    messageShow: PropTypes.func.isRequired,
    getTable: PropTypes.func.isRequired,
    table: PropTypes.string,
    rows: PropTypes.array,
    activeTableRowId: PropTypes.number,
    rowNewCreate: PropTypes.func.isRequired,
    tableRowRemove: PropTypes.func.isRequired,
    pages: PropTypes.object.isRequired
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

  onSelectFilterFaelligeGeschaefte = () => {
    const { geschaefteFilterByFields } = this.props
    const filter = filterForFaelligeGeschaefte()
    geschaefteFilterByFields(filter, 'fällige')
    // TODO: add ordering to state and call action here to order by frist desc
  }

  onSelectFilterAngekVernehml = () => {
    const { geschaefteFilterByFields } = this.props
    const filter = filterForAngekVernehml()
    geschaefteFilterByFields(filter, 'angekündigte Vernehmlassungen')
  }

  onSelectFilterFaelligeGeschaefteMitarbeiter = () => {
    const { geschaefteFilterByFields, username } = this.props
    const now = moment().format('YYYY-MM-DD')
    const filter = [
      {
        field: 'status',
        value: 'zurückgestellt',
        comparator: '!=='
      },
      {
        field: 'status',
        value: 'erledigt',
        comparator: '!=='
      },
      {
        field: 'datumAusgangAwel',
        value: '',
        comparator: '='
      },
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

  geschaefteFilterNav = () => {
    const { filterType } = this.props
    return (
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
          onSelect={this.focusFulltextFilter}
        >
          nach Volltext
        </MenuItem>
        <MenuItem divider />
        <MenuItem header>
          pfannenfertig:
        </MenuItem>
        <MenuItem
          eventKey={3.3}
          onSelect={this.onSelectFilterFaelligeGeschaefte}
        >
          fällige
        </MenuItem>
        <MenuItem
          eventKey={3.4}
          onSelect={this.onSelectFilterFaelligeGeschaefteMitarbeiter}
        >
          eigene fällige
        </MenuItem>
        <MenuItem
          eventKey={3.5}
          onSelect={this.onSelectFilterAngekVernehml}
        >
          angekündigte Vernehmlassungen
        </MenuItem>
        <MenuItem divider />
        <MenuItem
          eventKey={3.5}
          onSelect={this.removeFilter}
        >
          Filter entfernen
        </MenuItem>
      </NavDropdown>
    )
  }

  geschaeftNeuNav = () => {
    const { geschaeftNewCreate } = this.props
    return (
      <NavItem
        eventKey={4}
        onClick={geschaeftNewCreate}
        title="neues Geschäft"
      >
        <Glyphicon glyph="plus" />
      </NavItem>
    )
  }

  geschaeftLoeschenNav = () => {
    const { geschaeftSetDeleteIntended, activeId } = this.props
    return (
      <NavItem
        eventKey={5}
        onClick={() => geschaeftSetDeleteIntended(activeId)}
        title="Geschäft löschen"
        disabled={!activeId}
      >
        <Glyphicon glyph="trash" />
      </NavItem>
    )
  }

  tableRowNeuNav = () => {
    const { rowNewCreate, table } = this.props
    return (
      <NavItem
        eventKey={4}
        onClick={() =>
          rowNewCreate(table)
        }
        title="neuer Datensatz"
      >
        <Glyphicon glyph="plus" />
      </NavItem>
    )
  }

  tableRowLoeschenNav = () => {
    const {
      tableRowRemove,
      table,
      activeTableRowId
    } = this.props
    return (
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
    )
  }

  exportGeschaefteNav = () => (
    <NavDropdown
      eventKey={6}
      title="Exporte"
      id="exportGeschaefteNavDropdown"
    >
      <MenuItem
        eventKey={6.1}
        onClick={this.exportGeschaefteAll}
      >
        Gefilterte Geschäfte mit allen Feldern
      </MenuItem>
      <MenuItem
        eventKey={6.2}
        onClick={this.exportGeschaefteRechtsmittelVorjahre}
      >
        Rekurse und Beschwerden, Vergleich der letzten zwei Jahre
      </MenuItem>
    </NavDropdown>
  )

  berichteNav = () => {
    const { pagesInitiate, path, pages, geschaefteFilterByFields } = this.props
    const isActive = path === '/pages'
    const nameObject = {
      Fristen: 'Bericht: Fristen',
      List1: 'Bericht: Einfache Liste',
      vernehmlAngek: 'Bericht: Vernehmlassungen'
    }
    const name = nameObject[pages.reportType] || 'Berichte'
    const title = isActive ? name : 'Berichte'
    return (
      <NavDropdown
        eventKey={7}
        title={title}
        id="reports-nav-dropdown"
        active={isActive}
        className={isActive ? styles.navActive : null}
        onSelect={(eventKey) => {
          /*
           * react-bootstrap has an error causing the dropdown to stay open
           * and the message modal not to show!!!!
           *
           * this is an elaborate hack
           * to get the menu item to close immediately
           */
          if (eventKey === 7.1) {
            setTimeout(() => {
              pagesInitiate('Fristen')
            }, 0)
          }
          if (eventKey === 7.2) {
            setTimeout(() => {
              pagesInitiate('List1')
            }, 0)
          }
          if (eventKey === 7.3) {
            setTimeout(() => {
              geschaefteFilterByFields(filterForAngekVernehml(), 'angekündigte Vernehmlassungen')
              pagesInitiate('vernehmlAngek')
            }, 0)
          }
        }}
      >
        <MenuItem header>
          Berichte, die den gesetzten Filter übernehmen:
        </MenuItem>
        <MenuItem eventKey={7.1}>
          Fristen
        </MenuItem>
        <MenuItem eventKey={7.2}>
          Einfache Liste
        </MenuItem>
        <MenuItem divider />
        <MenuItem header>
          Berichte, welche einen eigenen Filter setzen:
        </MenuItem>
        <MenuItem eventKey={7.3}>
          angekündigte Vernehmlassungen
        </MenuItem>
      </NavDropdown>
    )
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

  exportGeschaefteAll = (e) => {
    e.preventDefault()
    const {
      geschaefteGefilterteIds,
      geschaefte,
      messageShow
    } = this.props
    const geschaefteGefiltert = geschaefte.filter((g) =>
      geschaefteGefilterteIds.includes(g.idGeschaeft)
    )
    exportGeschaefte(geschaefteGefiltert, messageShow)
  }

  exportGeschaefteRechtsmittelVorjahre = (e) => {
    e.preventDefault()
    const { geschaefte, messageShow } = this.props
    const thisYear = moment().year()
    const firstDate = moment(`01.01.${thisYear - 2}`, 'DD.MM.YYYY')
    const lastDate = moment(`31.12.${thisYear - 1}`, 'DD.MM.YYYY')
    function isInPreviousTwoYears(date) {
      return moment(date, 'DD.MM.YYYY').isBetween(firstDate, lastDate, 'days', '[]')
    }
    const geschaefteGefiltert = geschaefte.filter((g) => (
      g.geschaeftsart === 'Rekurs/Beschwerde' &&
      !!g.datumEingangAwel &&
      isInPreviousTwoYears(g.datumEingangAwel)
    ))
    // TODO: need new fields?
    // - Rekurrent bzw. Beschwerdeführer / Objekt
    // - Gegenstand des Rechtsstreits? (= gegenstand?)
    // - Hauptbetroffene Abteilung
    const fieldsWanted = [
      'datumEingangAwel',
      'gegenstand',
      'rechtsmittelInstanz',
      'rechtsmittelErledigung',
      'rechtsmittelEntscheidDatum',
      'rechtsmittelEntscheidNr',
      'idGeschaeft'
    ]
    // now reduce fields to wanted
    geschaefteGefiltert.forEach((g, index) => {
      geschaefteGefiltert[index] = _.pick(geschaefteGefiltert[index], fieldsWanted)
    })
    exportGeschaefte(geschaefteGefiltert, messageShow)
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
      status: 'Status',
      statusVernehmlassung: 'Status Vernehmlassung'
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
              this.geschaefteFilterNav()
            }
            {
              showGeschaefteStuff &&
              this.geschaeftNeuNav()
            }
            {
              showGeschaefteStuff &&
              this.geschaeftLoeschenNav()
            }
            {
              showGeschaefteAndPrint &&
              this.exportGeschaefteNav()
            }
            {
              showGeschaefteAndPrint &&
              this.berichteNav()
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
              <MenuItem
                eventKey={8.10}
                onClick={() => getTable('statusVernehmlassung')}
                active={table === 'statusVernehmlassung'}
              >
                Status Vernehmlassung
              </MenuItem>
            </NavDropdown>
            {
              showTableStuff &&
              this.tableRowNeuNav()
            }
            {
              showTableStuff &&
              this.tableRowLoeschenNav()
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
