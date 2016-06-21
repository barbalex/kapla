'use strict'

import React, { PropTypes } from 'react'
import {
  NavDropdown,
  MenuItem
} from 'react-bootstrap'
import moment from 'moment'
import _ from 'lodash'
import exportGeschaefte from '../src/exportGeschaefte'

const exportGeschaefteRechtsmittelVorjahre = (
  e,
  geschaefte,
  messageShow
) => {
  e.preventDefault()
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

const exportGeschaefteAll = (
  e,
  geschaefteGefilterteIds,
  geschaefte,
  messageShow
) => {
  e.preventDefault()
  const geschaefteGefiltert = geschaefte.filter((g) =>
    geschaefteGefilterteIds.includes(g.idGeschaeft)
  )
  exportGeschaefte(geschaefteGefiltert, messageShow)
}

const NavbarExportGeschaefteNav = ({
  geschaefte,
  messageShow,
  geschaefteGefilterteIds
}) =>
  <NavDropdown
    eventKey={6}
    title="Exporte"
    id="exportGeschaefteNavDropdown"
  >
    <MenuItem
      eventKey={6.1}
      onClick={(e) =>
        exportGeschaefteAll(
          e,
          geschaefteGefilterteIds,
          geschaefte,
          messageShow
        )
      }
    >
      Gefilterte Geschäfte mit allen Feldern
    </MenuItem>
    <MenuItem
      eventKey={6.2}
      onClick={(e) =>
        exportGeschaefteRechtsmittelVorjahre(
          e,
          geschaefte,
          messageShow
        )
      }
    >
      Rekurse und Beschwerden, Vergleich der letzten zwei Jahre
    </MenuItem>
  </NavDropdown>

NavbarExportGeschaefteNav.displayName = 'NavbarExportGeschaefteNav'

NavbarExportGeschaefteNav.propTypes = {
  geschaefte: PropTypes.array.isRequired,
  geschaefteGefilterteIds: PropTypes.array.isRequired,
  messageShow: PropTypes.func.isRequired
}

export default NavbarExportGeschaefteNav
