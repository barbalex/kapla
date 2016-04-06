import React, { Component, PropTypes } from 'react'
import { Navbar, NavDropdown, MenuItem, Nav, NavItem, Glyphicon, Input, Badge } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { debounce } from 'lodash'
import styles from './Navbar.css'

class MyToolbar extends Component {
  static propTypes = {
    holenDb: PropTypes.func.isRequired,
    setzeGeschaefteVolltextFilter: PropTypes.func.isRequired,
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

  onKeyPressFilterFulltext = (e) => {
    if (e.key === 'Enter') this.filterFulltext(e.target.value)
  }

  onChangeFilterFulltext = (e) => {
    const { setzeGeschaefteVolltextFilter } = this.props
    setzeGeschaefteVolltextFilter(e.target.value)
  }

  filterFulltext = (value) => {
    const { filtereGeschaefteNachVolltext } = this.props
    filtereGeschaefteNachVolltext(value)
  }

  onClickFilterGlyph = () => {
    const { setzeGeschaefteVolltextFilter, filtereGeschaefteNachVolltext, filterFulltext } = this.props
    setzeGeschaefteVolltextFilter(filterFulltext)
    filtereGeschaefteNachVolltext(filterFulltext)
  }

  onClickRemoveFilterGlyph = () => {
    const { setzeGeschaefteVolltextFilter, filtereGeschaefteNachVolltext } = this.props
    const filterFulltext = ''
    setzeGeschaefteVolltextFilter(filterFulltext)
    filtereGeschaefteNachVolltext(filterFulltext)
  }

  filterFulltextSearchGlyphicon = () => {
    return (<Glyphicon glyph='filter' onClick={this.onClickFilterGlyph} className={styles.filterInputRemoveIcon} />)
  }

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

    const dataIsFiltered = geschaefte.length !== geschaefteGefiltert.length
    const classNameFilterInput = dataIsFiltered ? [styles.filterInput, styles.filterInputActive].join(' ') : styles.filterInput
    const classNameBadge = dataIsFiltered ? styles.badgeWithActiveFilter : styles.badge

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
              value={filterFulltext}
              onChange={this.onChangeFilterFulltext}
              onKeyPress={this.onKeyPressFilterFulltext}
              className={classNameFilterInput}
              addonBefore={<Glyphicon glyph='search' onClick={this.onClickFilterGlyph} className={styles.filterInputRemoveIcon} />}
              addonAfter={<Glyphicon glyph='remove' onClick={this.onClickRemoveFilterGlyph} className={styles.filterInputRemoveIcon} />}
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
