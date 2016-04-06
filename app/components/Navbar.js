import React, { Component, PropTypes } from 'react'
import { Navbar, NavDropdown, MenuItem, Nav, NavItem, Glyphicon, Input, Badge } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { debounce } from 'lodash'
import styles from './Navbar.css'

class MyToolbar extends Component {
  static propTypes = {
    holenDb: PropTypes.func.isRequired,
    filtereGeschaefteNachVolltext: PropTypes.func.isRequired,
    holenGeschaefte: PropTypes.func.isRequired,
    username: PropTypes.string,
    erstelleNeuesGeschaeft: PropTypes.func.isRequired,
    willGeschaeftEntfernen: PropTypes.func.isRequired,
    activeId: PropTypes.number,
    filterFulltext: PropTypes.string,
    geschaefte: PropTypes.array,
    geschaefteGefiltert: PropTypes.array
  }

  onClickNewGeschaeft = () => {
    const { erstelleNeuesGeschaeft } = this.props
    erstelleNeuesGeschaeft()
  }

  onClickDeleteGeschaeft = () => {
    const { willGeschaeftEntfernen, activeId } = this.props
    willGeschaeftEntfernen(activeId)
  }

  onChangeFilterFulltext = (e) => {
    this.filterFulltext(e.target.value)
  }

  filterFulltext = (value) => {
    const { filtereGeschaefteNachVolltext, holenGeschaefte, filterFulltext } = this.props
    // only filter if value differs from existing
    // reason: blur happens also after enter
    if (value !== filterFulltext) {
      debounce(filtereGeschaefteNachVolltext, 200)(value)
    }
  }

  onClickFilterGlyph = () => {
    this.filterFulltext('')
  }

  filterFulltextSearchGlyphicon = () => (
    <Button><Glyphicon glyph='filter' /></Button>
  )

  render() {
    const {
      holenDb,
      username,
      erstelleNeuesGeschaeft,
      activeId,
      geschaefte,
      geschaefteGefiltert,
      filterFulltext
    } = this.props

    const classNameFilterInput = filterFulltext ? [styles.filterInput, styles.filterInputActive].join(' ') : styles.filterInput
    const classNameBadge = filterFulltext ? styles.badgeWithActiveFilter : styles.badge

    return (
      <Navbar inverse fluid>
        <Nav>
          <LinkContainer to={{ pathname: '/geschaefte' }}>
            <NavItem eventKey={1} href='#'>Geschäfte <Badge className={classNameBadge}>{geschaefteGefiltert.length}</Badge></NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/geschaeft' }} disabled = {!activeId}>
            <NavItem eventKey={2} href='#' disabled = {!activeId}>Geschäft</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/filter' }}>
            <NavItem eventKey={3} href='#'>Filter</NavItem>
          </LinkContainer>
          <NavItem
            eventKey={4}
            onClick={this.onClickNewGeschaeft}
            title='neues Geschäft'>
            <Glyphicon glyph='plus' />
          </NavItem>
          <NavItem
            eventKey = {5}
            onClick = {this.onClickDeleteGeschaeft}
            title = 'Geschäft löschen'
            disabled = {!activeId}
          >
            <Glyphicon glyph = 'trash' />
          </NavItem>
        </Nav>
        <Nav pullRight>
          <Navbar.Form pullLeft>
            <Input
              type='text'
              placeholder='Volltext filtern'
              onChange={this.onChangeFilterFulltext}
              className={classNameFilterInput}
              addonAfter={<Glyphicon glyph='remove' onClick={this.onClickFilterGlyph} className={styles.filterInputRemoveIcon} />}
            />
          </Navbar.Form>
          <NavDropdown eventKey={4} title='Menu' id='basic-nav-dropdown'>
            <MenuItem eventKey={4.1} onClick={holenDb}>Datenbank wählen</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
}

export default MyToolbar
