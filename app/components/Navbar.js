import React, { Component, PropTypes } from 'react'
import { Navbar, NavDropdown, MenuItem, Nav, NavItem, Glyphicon, Input } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

class MyToolbar extends Component {
  static propTypes = {
    holenDb: PropTypes.func.isRequired,
    filtereGeschaefteNachVolltext: PropTypes.func.isRequired,
    holenGeschaefte: PropTypes.func.isRequired,
    username: PropTypes.string,
    erstelleNeuesGeschaeft: PropTypes.func.isRequired,
    willGeschaeftEntfernen: PropTypes.func.isRequired,
    activeId: PropTypes.number
  }

  onClickNewGeschaeft = () => {
    const { erstelleNeuesGeschaeft } = this.props
    erstelleNeuesGeschaeft()
  }

  onClickDeleteGeschaeft = () => {
    const { willGeschaeftEntfernen, activeId } = this.props
    willGeschaeftEntfernen(activeId)
  }

  onKeyPressFulltextFilter = (e) => {
    const { filtereGeschaefteNachVolltext, holenGeschaefte } = this.props
    if (e.key === 'Enter') {
      filtereGeschaefteNachVolltext(e.target.value)
      holenGeschaefte()
    }
  }

  render() {
    const {
      holenDb,
      username,
      erstelleNeuesGeschaeft,
      activeId
    } = this.props

    return (
      <Navbar inverse fluid>
        <Navbar.Header>
          <LinkContainer to={{ pathname: '/' }}>
            <Navbar.Brand>
              <a href='#'>KAPLA</a>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={{ pathname: '/geschaefte' }}>
              <NavItem eventKey={1} href='#'>Geschäfte</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/geschaeft' }}>
              <NavItem eventKey={2} href='#'>Geschäft</NavItem>
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
                onKeyPress={this.onKeyPressFulltextFilter}
              />
            </Navbar.Form>
            <NavDropdown eventKey={4} title='Menu' id='basic-nav-dropdown'>
              <MenuItem eventKey={4.1} onClick={holenDb}>Datenbank wählen</MenuItem>
              <MenuItem divider />
              <LinkContainer to={{ pathname: '/counter' }}>
                <MenuItem eventKey={4.2}>Counter</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default MyToolbar
