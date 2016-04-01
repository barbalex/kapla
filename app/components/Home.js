import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './Home.css'
import Navbar from '../containers/Navbar.js'
import GeschaefteList from '../containers/GeschaefteList.js'

export default class Home extends Component {
  static propTypes = {
    fetchUsername: PropTypes.func.isRequired,
    username: PropTypes.string,
    holeDbAusConfig: PropTypes.func.isRequired,
    filterFields: PropTypes.object,
    filterFulltext: PropTypes.string,
    holenGeschaefte: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { fetchUsername, holeDbAusConfig, holenGeschaefte, filterFields, filterFulltext } = this.props
    fetchUsername()
    holeDbAusConfig()
    holenGeschaefte(filterFields, filterFulltext)
  }

  onResizePane (data) {
    console.log('data from resizing', data)
  }

  render () {
    const { username } = this.props
    return (
      <div>
        <GeschaefteList />
      </div>
    )
  }
}
