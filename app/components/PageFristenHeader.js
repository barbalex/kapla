'use strict'

/*
 * This component builds and displays a single page header for page Fristen
 */

import React, { Component } from 'react'
import styles from './PageFristen.css'

class PageFristenHeader extends Component {
  render = () => (
    <div className={styles.tableHeader}>
      <div className={styles.tableHeaderRow}>
        <div
          className={[styles.columnIdGeschaeft, styles.tableHeaderCell].join(' ')}
        >
          ID
        </div>
        <div
          className={[styles.columnGegenstand, styles.tableHeaderCell].join(' ')}
        >
          Gegenstand
        </div>
        <div
          className={[styles.columnStatus, styles.tableHeaderCell].join(' ')}
        >
          Status
        </div>
        <div
          className={[styles.columnKontaktIntern, styles.tableHeaderCell].join(' ')}
        >
          Kontakt
        </div>
      </div>
    </div>
  )
}

export default PageFristenHeader
