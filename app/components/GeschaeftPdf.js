'use strict'

import React from 'react'
import moment from 'moment'
import Geschaeft from '../containers/geschaeft/Geschaeft.js'
import styles from './geschaeftPdf.css'


const GeschaeftPdf = () =>
  <div className={styles.body}>
    <div className={styles.pageContainer}>
      <Geschaeft />
      <div className={styles.footer}>
        <p>
          {moment().format('DD.MM.YYYY')}
        </p>
      </div>
    </div>
  </div>

GeschaeftPdf.displayName = 'GeschaeftPdf'

export default GeschaeftPdf
