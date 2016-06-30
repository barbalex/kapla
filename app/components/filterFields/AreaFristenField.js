import React, { Component, PropTypes } from 'react'
import {
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
    values: PropTypes.object.isRequired,
    filterFields: PropTypes.array.isRequired,
    change: PropTypes.func.isRequired,
    changeComparator: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onChangeDatePicker = this.onChangeDatePicker.bind(this)
  }

  componentDidMount() {
    const { values, name } = this.props
    this.setState({ value: values[name] || '' })
  }

  componentDidUpdate() {
    const { values, name } = this.props
    const { value } = this.state
    console.log('AreaFristenField componentDidUpdate, name:', name)
    console.log('AreaFristenField componentDidUpdate, propsValue:', values[name])
    console.log('AreaFristenField componentDidUpdate, stateValue:', value)
    if (value !== values[name] && (values[name] || values[name] === 0)) {
      console.log('AreaFristenField component did update')
      this.setState({ value: values[name] })
    }
  }

  onChange(e) {
    this.setState({ value: e.target.value })
  }

  onBlur(e) {
    const { values, name, change } = this.props
    const { value } = this.state
    // only filter if value has changed
    console.log('onBlur, propsValue:', values[name])
    console.log('onBlur, stateValue:', e.target.value)
    if (e.target.value != values[name] && (e.target.value || e.target.value === 0)) {
      if (e.target.value) {
        e.target.value = moment(e.target.value, 'DD.MM.YYYY').format('DD.MM.YYYY')
      }
      change(e)
    }
  }

  onChangeDatePicker = (e, picker) => {
    const { name } = this.props
    const rValForBlur = {
      target: {
        type: 'text',
        name,
        value: picker.startDate
      }
    }
    const rValForChange = {
      target: {
        type: 'text',
        name,
        value: moment(picker.startDate, 'DD.MM.YYYY').format('DD.MM.YYYY')
      }
    }
    this.onChange(rValForChange)
    this.onBlur(rValForBlur)
  }

  render() {
    const {
      name,
      label,
      tabIndex,
      filterFields,
      changeComparator,
    } = this.props
    const {
      value,
    } = this.state
    /**
     * need to give addon no padding
     * and the originally addon's padding to the glyphicon
     * to make entire addon clickable
     * for opening calendar
     */
    const datePickerAddonStyle = {
      padding: 0,
    }
    const datePickerCalendarStyle = {
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 12,
      paddingRight: 12,
    }

    const fieldStyleName = `field${name.charAt(0).toUpperCase()}${name.slice(1)}`
    const filterField = filterFields.find((ff) => ff.field === name)
    const comparatorValue = filterField ? filterField.comparator : ''

    return (
      <FormGroup
        className={styles[fieldStyleName]}
        validationState={getDateValidationStateDate(value)}
      >
        <ControlLabel>
          {label}
        </ControlLabel>
        <InputGroup>
          <InputGroup.Button>
            <FormControl
              componentClass="select"
              className={styles.comparator}
              onChange={(e) => changeComparator(e.target.value, name)}
              value={comparatorValue}
            >
              <option value=""></option>
              <option value="=">=</option>
              <option value="!==">!=</option>
              <option value=">">{'>'}</option>
              <option value="<">{'<'}</option>
            </FormControl>
          </InputGroup.Button>
          <FormControl
            type="text"
            value={value}
            name={name}
            onChange={this.onChange}
            onBlur={this.onBlur}
            bsSize="small"
            tabIndex={tabIndex}
          />
          <InputGroup.Addon style={datePickerAddonStyle}>
            <DateRangePicker
              singleDatePicker
              drops="up"
              opens="left"
              onApply={this.onChangeDatePicker}
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
