'use strict'

import React, { PropTypes } from 'react'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import styles from './TableRow.css'

const change = ({ e, table, id, tableChangeState }) => {
  const { type, name, dataset } = e.target
  let { value } = e.target
  if (type === 'radio') {
    value = dataset.value
    // blur does not occur in radio
    blur(e)
  }
  tableChangeState(table, id, name, value)
}

const blur = ({ e, table, id, changeTableInDb }) => {
  const { type, name, dataset } = e.target
  let { value } = e.target
  if (type === 'radio') value = dataset.value
  changeTableInDb(table, id, name, value)
}

const fields = ({ row, table, id, tableChangeState, changeTableInDb }) =>
  Object.keys(row).map((fieldName, index) => {
    let value = row[fieldName]
    // react complains if value is null
    if (value === null) value = ''
    const field = (
      <FormGroup
        key={index}
        className={styles.formGroup}
      >
        <ControlLabel>
          {fieldName}
        </ControlLabel>
        <FormControl
          type="text"
          name={fieldName}
          value={value}
          onChange={(e) =>
            change({ e, table, id, tableChangeState })
          }
          onBlur={(e) =>
            blur({ e, table, id, changeTableInDb })
          }
        />
      </FormGroup>
    )
    return field
  })

const TableRow = ({ rows, id, table, tableChangeState, changeTableInDb }) => {
  const row = rows.find((r) =>
    r.id === id
  )

  if (row === undefined) return null

  return (
    <div className={styles.body}>
      <Form>
        {fields({ row, table, id, tableChangeState, changeTableInDb })}
      </Form>
    </div>
  )
}

TableRow.displayName = 'TableRow'

TableRow.propTypes = {
  table: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  id: PropTypes.number,
  tableChangeState: PropTypes.func.isRequired,
  changeTableInDb: PropTypes.func.isRequired
}

export default TableRow
