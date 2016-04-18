'use strict'

import React, { Component, PropTypes } from 'react'
import ReactList from 'react-list'
import _ from 'lodash'
import styles from './Table.css'

class Table extends Component {
  static propTypes = {
    rows: PropTypes.array.isRequired,
    id: PropTypes.number,
    tableRowToggleActivated: PropTypes.func.isRequired
  }

  onClickTableRow(id) {
    const { tableRowToggleActivated } = this.props
    tableRowToggleActivated(id)
  }

  itemColumns = (row) => {
    const keys = Object.keys(row)
    const values = _.values(row)

    return values.map((val, index) => {
      const className = keys[index] === 'id' ? styles.tableBodyIdCell : styles.tableBodyCell

      return <div key={index} className={className}>{val}</div>
    })
  }

  renderItem(index, key) {
    const { rows, id } = this.props
    const isActive = !!id
    const trClassName = isActive ? [styles.tableBodyRow, styles.active].join(' ') : styles.tableBodyRow
    const row = rows[index]

    return (
      <div
        key={key}
        className={trClassName}
        onClick={this.onClickTableRow.bind(this, row.id)}
      >
        {this.itemColumns(row)}
      </div>
    )
  }

  renderItems(items, ref) {
    return (
      <div ref={ref} className={styles.table}>
        {items}
      </div>
    )
  }

  tableHeaders = () => {
    const { rows } = this.props
    const headers = Object.keys(rows[0])
    return headers.map((header, index) => {
      const className = header === 'id' ? styles.tableHeaderIdCell : styles.tableHeaderCell
      return <div key={index} className={className}>{header}</div>
    })
  }

  render() {
    /**
     * class 'reactList' is needed to
     * apply ::-webkit-scrollbar: display: none;
     */
    const { rows } = this.props

    return (
      <div className={styles.body}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderRow}>
              {this.tableHeaders()}
            </div>
          </div>
          <div className={[styles.tableBody, 'reactList'].join(' ')}>
            <ReactList
              itemRenderer={::this.renderItem}
              length={rows.length}
              type="variable"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Table
