'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactList from 'react-list'
import _ from 'lodash'
import styles from './Table.css'

class Table extends Component {
  static propTypes = {
    rows: PropTypes.array.isRequired,
    id: PropTypes.number,
    tableRowToggleActivated: PropTypes.func.isRequired
  }

  state = {
    offsetWidth: 0
  }

  componentDidMount = () => {
    this.setOffsetWidth()
    window.addEventListener('resize', this.setOffsetWidth)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.setOffsetWidth)
  }

  onClickTableRow(id) {
    const { tableRowToggleActivated } = this.props
    tableRowToggleActivated(id)
  }

  setOffsetWidth = () => {
    const offsetWidth = ReactDOM.findDOMNode(this).offsetWidth
    this.setState({ offsetWidth })
  }

  itemColumns = (row) => {
    const keys = Object.keys(row)
    const values = _.values(row)
    const { offsetWidth } = this.state
    const normalFieldWidth = (offsetWidth - 50) / (keys.length - 1)

    return values.map((val, index) => {
      const widthClass = keys[index] === 'id' ? { maxWidth: 50 } : { maxWidth: normalFieldWidth }

      return <div key={index} style={widthClass} className={styles.tableBodyCell}>{val}</div>
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
    const { offsetWidth } = this.state
    const headers = Object.keys(rows[0])
    const normalFieldWidth = (offsetWidth - 50) / (headers.length - 1)
    return headers.map((header, index) => {
      const widthClass = header === 'id' ? { maxWidth: 50 } : { maxWidth: normalFieldWidth }
      return <div key={index} style={widthClass} className={styles.tableHeaderCell}>{header}</div>
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
