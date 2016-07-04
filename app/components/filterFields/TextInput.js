'use strict'

import React, { PropTypes } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import ComparatorSelector from '../../containers/filterFields/ComparatorSelector'
import SortSelector from '../../containers/filterFields/SortSelector'

const TextInput = ({
  name,
  change,
  values,
  changeComparator,
  tabIndex,
  autoFocus,
}) =>
  <InputGroup>
    <SortSelector
      name={name}
    />
    <ComparatorSelector
      name={name}
      changeComparator={changeComparator}
    />
    <FormControl
      type="text"
      value={values[name] || ''}
      name={name}
      onChange={change}
      tabIndex={tabIndex}
      autoFocus={autoFocus}
    />
  </InputGroup>

TextInput.displayName = 'TextInput'

/**
 * do not make options required
 * as they may be loaded after the component
 */
TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  changeComparator: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
  autoFocus: PropTypes.bool.isRequired,
}

export default TextInput
