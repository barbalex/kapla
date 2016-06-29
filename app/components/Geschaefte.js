'use strict'

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactList from 'react-list'
import styles from './Geschaefte.css'
import GeschaefteItem from '../containers/GeschaefteItem'

class Geschaefte extends Component {
  static propTypes = {
    geschaefteGefilterteIds: PropTypes.array
  }

  state = {
    tableBodyOverflows: true
  }

  componentDidUpdate() {
    /**
     * this only works in a setTimeout!
     * otherwise tableBody scrollHeight equals offsetHeight
     */
    setTimeout(() => this.setTableBodyOverflow(), 0)
  }

  setTableBodyOverflow() {
    const { tableBodyOverflows } = this.state
    const overflows = this.doesTableBodyOverflow()
    if (overflows !== tableBodyOverflows) {
      this.setState({ tableBodyOverflows: !tableBodyOverflows })
    }
  }

  doesTableBodyOverflow() {
    const tableBodyNode = ReactDOM.findDOMNode(this.tableBody)
    return tableBodyNode.offsetHeight < tableBodyNode.scrollHeight
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
    const { tableBodyOverflows } = this.state

    return (
      <div className={styles.body}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div
              className={styles.tableHeaderRow}
              style={{
                paddingRight: tableBodyOverflows ? 17 : null
              }}
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
          <div
            className={styles.tableBody}
            ref={(c) => { this.tableBody = c }}
          >
            <ReactList
              itemRenderer={::this.renderItem}
              length={geschaefteGefilterteIds ? geschaefteGefilterteIds.length : 0}
              type="uniform"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Geschaefte
