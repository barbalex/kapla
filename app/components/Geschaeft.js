import React, { Component, PropTypes } from 'react'
import { Input } from 'react-bootstrap'
import styles from './Counter.css'
import Navbar from '../containers/Navbar.js'

class Geschaeft extends Component {
  static propTypes = {
    holenGeschaeft: PropTypes.func.isRequired,
    geschaeft: PropTypes.object.isRequired
  }

  render() {
    const {
      holenGeschaeft,
      geschaeft
    } = this.props

    return (
      <div>
        <Navbar />
        <form className='form-horizontal'>
          <Input
            type = 'number'
            label = 'ID Geschäft'
            labelClassName='col-xs-2'
            wrapperClassName='col-xs-10'
            value = {geschaeft.idGeschaeft}
            bsSize = 'small'
            disabled
          />
          <Input
            type = 'text'
            label = 'Gegenstand'
            labelClassName='col-xs-2'
            wrapperClassName='col-xs-10'
            value = {geschaeft.gegenstand}
            bsSize = 'small'
          />
        </form>
      </div>
    )
  }
}

export default Geschaeft
