'use strict'

import React, { PropTypes } from 'react'
import {
  DropdownButton,
  FormGroup,
  InputGroup,
  FormControl,
  ControlLabel,
  Glyphicon
} from 'react-bootstrap'
import moment from 'moment'
moment.locale('de')
import DateRangePicker from 'react-bootstrap-daterangepicker'
import styles from './areaFristenField.css'
import getDateValidationStateDate from '../../src/getDateValidationStateDate'

class AreaFristenField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tabIndex: PropTypes.number.isRequired,
    values: PropTypes.object,
    change: PropTypes.func.isRequired,
    changeComparator: PropTypes.func.isRequired,
    onChangeDatePicker: PropTypes.func.isRequired
  }

  state = {
    tableBodyOverflows: true
  }

  render() {
    const {
      name,
      label,
      tabIndex,
      values,
      change,
      changeComparator,
      onChangeDatePicker
    } = this.props
    /**
     * need to give addon no padding
     * and the originally addon's padding to the glyphicon
     * to make entire addon clickable
     * for opening calendar
     */
    const datePickerAddonStyle = {
      padding: 0
    }
    const datePickerCalendarStyle = {
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 12,
      paddingRight: 12
    }

    const fieldStyleName = `field${name.charAt(0).toUpperCase()}${name.slice(1)}`

    return (
      <FormGroup
        className={styles[fieldStyleName]}
        validationState={getDateValidationStateDate(values[name])}
      >
        <ControlLabel>
          {label}
        </ControlLabel>
        <InputGroup>
          <FormControl
            type="text"
            value={values[name] || ''}
            name={name}
            onChange={change}
            bsSize="small"
            tabIndex={tabIndex}
          />
          <InputGroup.Addon style={datePickerAddonStyle}>
            <DateRangePicker
              singleDatePicker
              drops="up"
              opens="left"
              onApply={onChangeDatePicker.bind(this, name)}
              className={styles.datePicker}
            >
              <Glyphicon
                glyph="calendar"
                style={datePickerCalendarStyle}
              />
            </DateRangePicker>
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
    )
  }
}

export default AreaFristenField
