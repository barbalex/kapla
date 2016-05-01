'use strict'

/*
 * This component builds and displays a single page
 */

import React, { Component, PropTypes } from 'react'
import styles from './PageList1.css'

function isOdd(num) {
  return num % 2
}

class PageList1Rows extends Component {
  static propTypes = {
    geschaeft: PropTypes.object,
    rowIndex: PropTypes.number
  }
  render = () => {
    const { geschaeft, rowIndex } = this.props
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

    const rowClassName = !isOdd(rowIndex) ? styles.tableBodyRowShaded : styles.tableBodyRow

    return (
      <div
        key={geschaeft.idGeschaeft}
        className={rowClassName}
      >
        <div className={[styles.columnGegenstand, styles.tableBodyCell].join(' ')}>
          <div>
            {geschaeft.gegenstand}
          </div>
        </div>
        <div className={[styles.columnGeschaeftsart, styles.tableBodyCell].join(' ')}>
          <div>
            {geschaeft.geschaeftsart}
          </div>
        </div>
        <div className={[styles.columnStatus, styles.tableBodyCell].join(' ')}>
          <div>
            {geschaeft.status}
          </div>
        </div>
        <div className={[styles.columnVerantwortlich, styles.tableBodyCell].join(' ')}>
          <div>
            {geschaeft.verantwortlich}
          </div>
        </div>
        <div className={[styles.columnFristMitarbeiter, styles.tableBodyCell].join(' ')}>
          <div>
            {geschaeft.fristMitarbeiter}
          </div>
        </div>
        <div className={[styles.columnIdVorgeschaeft, styles.tableBodyCell].join(' ')}>
          <div>
            {geschaeft.idVorgeschaeft}
          </div>
        </div>
        <div className={[styles.columnIdGeschaeft, styles.tableBodyCell].join(' ')}>
          <div>
            {geschaeft.idGeschaeft}
          </div>
        </div>
      </div>
    )
  }
}

export default PageList1Rows
