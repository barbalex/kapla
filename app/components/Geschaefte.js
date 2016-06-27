'use strict'

import React, { Component, PropTypes } from 'react'
import ReactList from 'react-list'
import styles from './Geschaefte.css'
import GeschaefteItem from '../containers/GeschaefteItem'

class Geschaefte extends Component {
  static propTypes = {
    geschaefteGefilterteIds: PropTypes.array.isRequired
  }

  renderItem(index, key) {
    return (
      <GeschaefteItem
        index={index}
        key={key}
        keyPassed={key}
      />
    )
  }

  renderItems(items, ref) {
    return (
      <div
        ref={ref}
        className={styles.table}
      >
        {items}
      </div>
    )
  }

  render() {
    const { geschaefteGefilterteIds } = this.props

    return (
      <div className={styles.body}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            {/* if list overflows, need padding-right of 17px */}
            <div
              className={styles.tableHeaderRow}
            >
              <div className={[styles.columnIdGeschaeft, styles.tableHeaderCell].join(' ')}>
                ID
              </div>
              <div className={[styles.columnGegenstand, styles.tableHeaderCell].join(' ')}>
                Gegenstand
              </div>
              <div className={[styles.columnStatus, styles.tableHeaderCell].join(' ')}>
                Status
              </div>
              <div className={[styles.columnKontaktIntern, styles.tableHeaderCell].join(' ')}>
                Verantwortlich
              </div>
            </div>
          </div>
          <div className={styles.tableBody}>
            <ReactList
              itemRenderer={::this.renderItem}
              length={geschaefteGefilterteIds.length}
              type="uniform"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Geschaefte
