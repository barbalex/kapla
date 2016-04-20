'use strict'

import React, { Component, PropTypes } from 'react'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import styles from './TableRow.css'

class TableRow extends Component {
  static propTypes = {
    table: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    id: PropTypes.number,
    tableChangeState: PropTypes.func.isRequired,
    changeTableInDb: PropTypes.func.isRequired
  }

  change = (e) => {
    const { table, id, tableChangeState } = this.props
    const { type, name, dataset } = e.target
    let { value } = e.target
    if (type === 'radio') {
      value = dataset.value
      // blur does not occur in radio
      this.blur(e)
    }
    tableChangeState(table, id, name, value)
  }

  blur = (e) => {
    const { table, id, changeTableInDb } = this.props
    const { type, name, dataset } = e.target
    let { value } = e.target
    if (type === 'radio') value = dataset.value
    changeTableInDb(table, id, name, value)
  }

  fields = (row) => Object.keys(row).map((fieldName, index) => {
    const value = row[fieldName]
    const field = (
      <FormGroup key={index} className={styles.formGroup}>
        <ControlLabel>{fieldName}</ControlLabel>
        <FormControl type="text" name={fieldName} value={value} onChange={this.change} onBlur={this.blur} />
      </FormGroup>
    )
    return field
  })

  render() {
    const { rows, id } = this.props
    const row = rows.find((r) => r.id === id)

    if (row === undefined) return null

    return (
      <div className={styles.body}>
        <Form>
          {this.fields(row)}
        </Form>
      </div>
    )
  }
}

export default TableRow
