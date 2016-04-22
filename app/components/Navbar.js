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
  FormControl,
  Badge
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import moment from 'moment'
import ModalGeschaeftDelete from '../containers/ModalGeschaeftDelete.js'
import ModalMessage from '../containers/ModalMessage.js'
import styles from './Navbar.css'
import exportGeschaefte from '../src/exportGeschaefte.js'

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
    geschaefte: PropTypes.array.isRequired,
    geschaefteGefilterteIds: PropTypes.array.isRequired,
    showMessageModal: PropTypes.bool.isRequired,
    dbGetFromConfig: PropTypes.func.isRequired,
    willDeleteGeschaeft: PropTypes.bool.isRequired,
    pagesInitiate: PropTypes.func.isRequired,
    navbarVisible: PropTypes.bool.isRequired,
    navbarHide: PropTypes.func.isRequired,
    navbarShow: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    messageShow: PropTypes.func.isRequired,
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
      geschaefteFilterByFulltext(e.target.value)
    }
  }

  onClickPrint = (e) => {
    const {
      navbarShow,
      navbarHide
    } = this.props
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
    navbarHide()
    win.webContents.printToPDF(printToPDFOptions, (error, data) => {
      if (error) throw error
      dialog.showSaveDialog(dialogOptions, (path) => {
        if (path) {
          fs.writeFile(path, data, (err) => {
            // re-add navbar
            navbarShow()
            if (err) throw err
          })
        }
      })
    })
  }

  onSelectFilterFaelligeGeschaefte = () => {
    const { geschaefteFilterByFields } = this.props
    const now = moment().format('YYYY-MM-DD')
    const filter = {
      status: {
        value: 'zurückgestellt',
        comparator: '!=='
      },
      status: {
        value: 'erledigt',
        comparator: '!=='
      },
      datumAusgangAwel: {
        value: '',
        comparator: '='
      },
      fristMitarbeiter: {
        value: now,
        comparator: '<'
      }
    }
    geschaefteFilterByFields(filter)
    // TODO: add ordering to state and call action here to order by frist desc
  }

  onSelectFilterFaelligeGeschaefteMitarbeiter = () => {
    const { geschaefteFilterByFields, username } = this.props
    const now = moment().format('YYYY-MM-DD')
    const filter = {
      status: {
        value: 'zurückgestellt',
        comparator: '!=='
      },
      status: {
        value: 'erledigt',
        comparator: '!=='
      },
      datumAusgangAwel: {
        value: '',
        comparator: '='
      },
      fristMitarbeiter: {
        value: now,
        comparator: '<'
      },
      itKonto: username
    }
    geschaefteFilterByFields(filter)
    // TODO: add ordering to state and call action here to order by frist desc
  }

  removeFilter = () => {
    const { geschaefteFilterByFulltextSet, geschaefteFilterByFulltext } = this.props
    const filterFulltext = ''
    geschaefteFilterByFulltextSet(filterFulltext)
    geschaefteFilterByFulltext(filterFulltext)
  }

  geschaefteFilterNav = () => (
    <NavDropdown
      eventKey={3}
      title="Filter"
      id="basic-nav-dropdown"
    >
      <MenuItem header>individuell:</MenuItem>
      <LinkContainer to={{ pathname: '/filter' }}>
        <MenuItem eventKey={3.1}>nach Feldern</MenuItem>
      </LinkContainer>
      <MenuItem eventKey={3.2} onSelect={this.focusFulltextFilter}>nach Volltext</MenuItem>
      <MenuItem divider />
      <MenuItem header>pfannenfertig:</MenuItem>
      <MenuItem eventKey={3.3} onSelect={this.onSelectFilterFaelligeGeschaefte}>fällige</MenuItem>
      <MenuItem eventKey={3.4} onSelect={this.onSelectFilterFaelligeGeschaefteMitarbeiter}>eigene fällige</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={3.5} onSelect={this.removeFilter}>Filter entfernen</MenuItem>
    </NavDropdown>
  )

  geschaeftNeuNav = () => {
    const { geschaeftNewCreate } = this.props
    return (
      <NavItem
        eventKey={4}
        onClick={() => geschaeftNewCreate()}
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

  exportGeschaefteNav = () => (
    <NavItem
      eventKey={6}
      onClick={this.exportGeschaefte}
      title="Geschäfte exportieren"
    >
      <Glyphicon glyph="share" />
    </NavItem>
  )

  berichteNav = () => {
    const { pagesInitiate } = this.props
    return (
      <NavDropdown
        eventKey={7}
        title="Berichte"
        id="basic-nav-dropdown"
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
              pagesInitiate()
            }, 0)
          }
        }}
      >
        <MenuItem eventKey={7.1}>Fristen</MenuItem>
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
    const { filterFulltext, geschaefte, geschaefteGefilterteIds } = this.props
    const dataIsFiltered = geschaefte.length !== geschaefteGefilterteIds.length
    const dataIsFilteredStyle = [styles.filterInput, styles.filterInputActive].join(' ')
    const classNameFilterInput = dataIsFiltered ? dataIsFilteredStyle : styles.filterInput
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

  exportGeschaefte = (e) => {
    const { geschaefteGefilterteIds, geschaefte, messageShow } = this.props
    e.preventDefault()
    const geschaefteGefiltert = geschaefte.filter((g) => geschaefteGefilterteIds.includes(g.idGeschaeft))
    exportGeschaefte(geschaefteGefiltert, messageShow)
  }

  render() {
    const {
      dbGet,
      geschaefte,
      geschaefteGefilterteIds,
      showMessageModal,
      willDeleteGeschaeft,
      navbarVisible,
      path,
      getTable,
      table,
      rows
    } = this.props

    if (!navbarVisible) return null

    const dataIsFiltered = geschaefte.length !== geschaefteGefilterteIds.length
    const classNameBadge = dataIsFiltered ? styles.badgeWithActiveFilter : styles.badge
    const showPrint = path === '/pages'
    const showGeschaefteStuff = path === '/geschaefte'
    const stammdatenTitle = table ? `${table} (${rows.length})` : 'Stammdaten'
    // does not work - should keep menu active when table is loaded
    // probably a bug in react-bootstrap
    const isStammdatenMenuActive = !!table

    return (
      <div>
        {willDeleteGeschaeft && <ModalGeschaeftDelete />}
        {showMessageModal && <ModalMessage />}
        <Navbar inverse fluid className={styles.navbar}>
          <Nav>
            <LinkContainer to={{ pathname: '/geschaefte' }}>
              <NavItem eventKey={1} href="#">
                Geschäfte <Badge className={classNameBadge}>{geschaefteGefilterteIds.length}</Badge>
              </NavItem>
            </LinkContainer>
            {showGeschaefteStuff && this.geschaefteFilterNav()}
            {showGeschaefteStuff && this.geschaeftNeuNav()}
            {showGeschaefteStuff && this.geschaeftLoeschenNav()}
            {showGeschaefteStuff && this.exportGeschaefteNav()}
            {showGeschaefteStuff && this.berichteNav()}
            {showPrint && this.printNav()}
            <NavDropdown eventKey={8} title={stammdatenTitle} id="basic-nav-dropdown" active={isStammdatenMenuActive}>
              <MenuItem eventKey={8.1} onClick={() => getTable('interne')}>Interne</MenuItem>
              <MenuItem eventKey={8.2} onClick={() => getTable('externe')}>Externe</MenuItem>
              <MenuItem divider />
              <MenuItem header>Auswahllisten:</MenuItem>
              <MenuItem eventKey={8.3} onClick={() => getTable('gdeplz')}>Gemeinden</MenuItem>
              <MenuItem eventKey={8.4} onClick={() => getTable('geschaeftsart')}>Geschäftsart</MenuItem>
              <MenuItem eventKey={8.6} onClick={() => getTable('parlVorstossTyp')}>Parlament. Vorstoss Typ</MenuItem>
              <MenuItem eventKey={8.7} onClick={() => getTable('rechtsmittelerledigung')}>Rechtsmittelerledigung</MenuItem>
              <MenuItem eventKey={8.8} onClick={() => getTable('status')}>Status</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            {showGeschaefteStuff && this.fulltextFilterNav()}
            <NavDropdown eventKey={9} title="&#8942;" id="basic-nav-dropdown" noCaret>
              <MenuItem eventKey={9.1} onClick={dbGet}>Datenbank wählen</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default NavbarComponent
