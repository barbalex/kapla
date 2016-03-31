import React, { Component, PropTypes } from 'react'
import { Navbar, NavDropdown, MenuItem, Nav } from 'react-bootstrap'

class MyToolbar extends Component {
  static propTypes = {
    holenDb: PropTypes.func.isRequired,
    username: PropTypes.string
  }

  render() {
    const {
      holenDb,
      username
    } = this.props

    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">KAPLA</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} onClick={holenDb}>Datenbank wählen</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>...</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default MyToolbar
