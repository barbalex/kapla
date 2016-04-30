'use strict'

/*
 * This component builds and displays a single page
 */

import React, { Component, PropTypes } from 'react'
import styles from './PageFristen.css'

class PageFristenRows extends Component {
  static propTypes = {
    geschaeft: PropTypes.object
  }
  render = () => {
    const { geschaeft } = this.props
    const fristMitarbeiter = geschaeft.fristMitarbeiter ? `Frist: ${geschaeft.fristMitarbeiter}` : ''
    /**
     * need to enforce max string length
     * if a field contains more text than fits on a page
     * the page is (re-)created infinitely...
     */
    const maxStringLength = 2000
    let gegenstand = geschaeft.gegenstand
    if (gegenstand && gegenstand.length > maxStringLength) {
      gegenstand = gegenstand.substring(0, maxStringLength)
      gegenstand += '... (Text für die Ausgabe gekürzt)'
    }
    let details = geschaeft.details
    if (details && details.length > maxStringLength) {
      details = details.substring(0, maxStringLength)
      details += '... (Text für die Ausgabe gekürzt)'
    }
    let faelligkeitText = geschaeft.faelligkeitText
    if (faelligkeitText && faelligkeitText.length > maxStringLength) {
      faelligkeitText = faelligkeitText.substring(0, maxStringLength)
      faelligkeitText += '... (Text für die Ausgabe gekürzt)'
    }

    return (
      <div
        key={geschaeft.idGeschaeft}
        className={styles.tableBodyRow}
      >
        <div className={[styles.columnIdGeschaeft, styles.tableBodyCell].join(' ')}>
          <div>
            {geschaeft.idGeschaeft}
          </div>
        </div>
        <div className={[styles.columnGegenstand, styles.tableBodyCell].join(' ')}>
          <div className={styles.fieldGegenstand}>
            {gegenstand}
          </div>
          <div>
            {details}
          </div>
        </div>
        <div className={[styles.columnStatus, styles.tableBodyCell].join(' ')}>
          <div>
            {geschaeft.status}
          </div>
          <div>
            {fristMitarbeiter}
          </div>
          <div>
            {faelligkeitText}
          </div>
        </div>
        <div className={[styles.columnKontaktIntern, styles.tableBodyCell].join(' ')}>
          <div>
            {geschaeft.idKontaktIntern}
          </div>
          <div>
            {geschaeft.kontaktInternVornameName}
          </div>
        </div>
      </div>
    )
  }
}

export default PageFristenRows
