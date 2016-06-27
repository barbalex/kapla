'use strict'

import React, { Component, PropTypes } from 'react'
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ModalGeschaeftDelete from '../../containers/ModalGeschaeftDelete'
import ModalMessage from '../../containers/ModalMessage'
import BerichteNav from '../../containers/navbar/BerichteNav'
import GeschaeftNeuNav from '../../containers/navbar/GeschaeftNewNav'
import GeschaeftLoeschenNav from '../../containers/navbar/GeschaeftDeleteNav'
import TableRowNeuNav from '../../containers/navbar/TableRowNewNav'
import TableRowDeleteNav from '../../containers/navbar/TableRowDeleteNav'
import ExportGeschaefteNav from '../../containers/navbar/ExportGeschaefteNav'
import PrintNav from './PrintNav.js'
import StammdatenNav from '../../containers/navbar/StammdatenNav'
import FilterNav from '../../containers/navbar/FilterNav'
import OptionsNav from '../../containers/navbar/OptionsNav'
import styles from './Navbar.css'

class NavbarComponent extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    geschaefteGefilterteIds: PropTypes.array.isRequired,
    showMessageModal: PropTypes.bool.isRequired,
    dbGetFromConfig: PropTypes.func.isRequired,
    willDeleteGeschaeft: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired
  }

  componentWillMount() {
    const { dbGetFromConfig } = this.props
    dbGetFromConfig()
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
                href="#"
              >
                Geschäfte <sup className={classNameBadge}>{geschaefteGefilterteIds.length}</sup>
              </NavItem>
            </LinkContainer>
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
              !showTableStuff &&
              <FilterNav />
            }
            <OptionsNav />
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default NavbarComponent
