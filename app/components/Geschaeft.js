import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './Counter.css'
import Navbar from '../containers/Navbar.js'

class Geschaeft extends Component {
  static propTypes = {
    holenGeschaeft: PropTypes.func.isRequired,
    geschaeft: PropTypes.array.isRequired
  }

  render() {
    const {
      holenGeschaeft,
      geschaeft
    } = this.props

    return (
      <div>
        <Navbar />
      </div>
    )
  }
}

export default Geschaeft
