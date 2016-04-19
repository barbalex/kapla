'use strict'

import React, { Component, PropTypes } from 'react'
import { Form, FormGroup, Col, FormControl } from 'react-bootstrap'
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

  fields = (row) => Object.keys(row).map((key, index) => {
    const value = row[key]
    const controlId = `formHorizontal${key}`
    console.log('compoenents/TableRow, fields, key', key)
    console.log('compoenents/TableRow, fields, value', value)

    const field = (
      <FormGroup key={index} controlId={controlId}>
        <Col sm={2}>
          {key}
        </Col>
        <Col sm={10}>
          <FormControl type="text" name={key} value={value} onChange={this.change} onBlur={this.blur} />
        </Col>
      </FormGroup>
    )
    console.log('compoenents/TableRow, fields, field', field)
    return field
  })

  render() {
    const { rows, id } = this.props
    const row = rows.find((r) => r.id === id)

    if (row === undefined) return null

    console.log('compoenents/TableRow, render, row', row)

    const fields = this.fields(row)
    console.log('compoenents/TableRow, render, fields', fields)

    return (
      <Form horizontal>
        {this.fields(row)}
      </Form>
    )
  }
}

export default TableRow
