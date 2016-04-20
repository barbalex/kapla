'use strict'

import { remote } from 'electron'
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
    getTable: PropTypes.func.isRequired
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

  onClickRemoveFilterGlyph = () => {
    const { geschaefteFilterByFulltextSet, geschaefteFilterByFulltext } = this.props
    const filterFulltext = ''
    geschaefteFilterByFulltextSet(filterFulltext)
    geschaefteFilterByFulltext(filterFulltext)
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

  onSelectFilterFaelligeGeschaefte = (e) => {
    const { geschaefteFilterByFields } = this.props
    e.preventDefault()
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
        value: null,
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

  printNav = () => (
    <NavItem
      eventKey = {7}
      onClick = {this.onClickPrint}
      title = "Drucken"
    >
      <Glyphicon glyph = "print" />
    </NavItem>
  )

  onSelectFilterFaelligeGeschaefteMitarbeiter = (e) => {
    const { geschaefteFilterByFields, username } = this.props
    e.preventDefault()
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
        value: null,
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

  exportGeschaefte = (e) => {
    const { geschaefteGefilterteIds, geschaefte, messageShow } = this.props
    e.preventDefault()
    const geschaefteGefiltert = geschaefte.filter((g) => geschaefteGefilterteIds.includes(g.idGeschaeft))
    exportGeschaefte(geschaefteGefiltert, messageShow)
  }

  render() {
    const {
      dbGet,
      activeId,
      geschaefte,
      geschaefteGefilterteIds,
      showMessageModal,
      filterFulltext,
      willDeleteGeschaeft,
      navbarVisible,
      pagesInitiate,
      geschaeftNewCreate,
      geschaeftSetDeleteIntended,
      path,
      getTable
    } = this.props

    if (!navbarVisible) return null

    const dataIsFiltered = geschaefte.length !== geschaefteGefilterteIds.length
    const dataIsFilteredStyle = [styles.filterInput, styles.filterInputActive].join(' ')
    const classNameFilterInput = dataIsFiltered ? dataIsFilteredStyle : styles.filterInput
    const classNameBadge = dataIsFiltered ? styles.badgeWithActiveFilter : styles.badge
    const showPrint = path === '/pages'

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
            <NavDropdown
              eventKey={3}
              title="Filter"
              id="basic-nav-dropdown"
            >
              <LinkContainer to={{ pathname: '/filter' }}>
                <MenuItem eventKey={3.1}>nach Feldern</MenuItem>
              </LinkContainer>
              <MenuItem eventKey={3.2} onSelect={this.onSelectFilterFaelligeGeschaefte}>fällige</MenuItem>
              <MenuItem eventKey={3.3} onSelect={this.onSelectFilterFaelligeGeschaefteMitarbeiter}>eigene fällige</MenuItem>
            </NavDropdown>
            <NavItem
              eventKey={4}
              onClick={() => geschaeftNewCreate()}
              title="neues Geschäft"
            >
              <Glyphicon glyph="plus" />
            </NavItem>
            <NavItem
              eventKey = {5}
              onClick = {() => geschaeftSetDeleteIntended(activeId)}
              title = "Geschäft löschen"
              disabled = {!activeId}
            >
              <Glyphicon glyph = "trash" />
            </NavItem>
            <NavItem
              eventKey={6}
              onClick={this.exportGeschaefte}
              title="Geschäfte exportieren"
            >
              <Glyphicon glyph="share" />
            </NavItem>
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
            {showPrint && this.printNav()}
          </Nav>
          <Nav pullRight>
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
                />
              </FormGroup>
            <Glyphicon
              glyph="remove"
              onClick={this.onClickRemoveFilterGlyph}
              className={styles.filterInputRemoveIcon}
              title="Filter entfernen"
            />
            </Navbar.Form>
            <NavDropdown eventKey={8} title="Menu" id="basic-nav-dropdown">
              <MenuItem eventKey={8.1} onClick={() => getTable('interne')}>Interne</MenuItem>
              <MenuItem eventKey={8.2} onClick={() => getTable('externe')}>Externe</MenuItem>
              <MenuItem eventKey={8.3} onClick={() => getTable('gdeplz')}>Gemeinden</MenuItem>
              <MenuItem eventKey={8.4} onClick={() => getTable('geschaeftsart')}>Auswahlliste Geschäftsart</MenuItem>
              <MenuItem eventKey={8.6} onClick={() => getTable('parlVorstossTyp')}>Auswahlliste Parlament. Vorstoss Typ</MenuItem>
              <MenuItem eventKey={8.7} onClick={() => getTable('rechtsmittelerledigung')}>Auswahlliste Rechtsmittelerledigung</MenuItem>
              <MenuItem eventKey={8.8} onClick={() => getTable('status')}>Auswahlliste Status</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={8.9} onClick={dbGet}>Datenbank wählen</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default NavbarComponent
