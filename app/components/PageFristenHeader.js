'use strict'

/*
 * This component builds and displays a single page header for page Fristen
 */

import React from 'react'
import styles from './PageFristen.css'

const PageFristenHeader = () =>
  <div className={styles.tableHeader}>
    <div className={styles.tableHeaderRow}>
      <div
        className={[styles.columnIdGeschaeft, styles.tableHeaderCell].join(' ')}
      >
        <b>ID</b>
      </div>
      <div
        className={[styles.columnGegenstand, styles.tableHeaderCell].join(' ')}
      >
        <b>Gegenstand</b> / Details / <em>nächster Schritt</em>
      </div>
      <div
        className={[styles.columnStatus, styles.tableHeaderCell].join(' ')}
      >
        <b>Status</b>
      </div>
      <div
        className={[styles.columnKontaktIntern, styles.tableHeaderCell].join(' ')}
      >
        <b>Verantwortlich</b>
      </div>
    </div>
  </div>

export default PageFristenHeader
