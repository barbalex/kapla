'use strict'

import React from 'react'
import Geschaeft from '../containers/geschaeft/Geschaeft.js'
import styles from './geschaeftPdf.css'


const GeschaeftPdf = () =>
  <div className={styles.body}>
    <Geschaeft />
  </div>

GeschaeftPdf.displayName = 'GeschaeftPdf'

export default GeschaeftPdf
