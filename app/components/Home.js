import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './Home.css'
import Toolbar from '../containers/Toolbar.js'

export default class Home extends Component {
  static propTypes = {
    fetchUsername: PropTypes.func.isRequired,
    username: PropTypes.string
  }

  componentDidMount () {
    const { fetchUsername } = this.props
    fetchUsername ()
  }

  render () {
    const { username } = this.props
    return (
      <div>
        <Toolbar />
        <div className={styles.container}>
          <h2>Home</h2>
          <Link to='/counter'>to Counter</Link><br/>
          <Link to='/geschaefte'>to Geschaefte</Link>
        </div>
        <p>{username}</p>
      </div>
    )
  }
}
