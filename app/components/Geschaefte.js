import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './Counter.css'

class Geschaefte extends Component {
  static propTypes = {
    hole: PropTypes.func.isRequired,
    geschaefte: PropTypes.array
  }

  render() {
    const { hole, geschaefte } = this.props
    return (
      <div>
        <div className={styles.backButton}>
          <Link to='/'>
            <i className='fa fa-arrow-left fa-3x' />
          </Link>
        </div>
        <div className={`counter ${styles.counter}`}>
          {geschaefte}
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={() => hole()}>hole</button>
        </div>
      </div>
    )
  }
}

export default Geschaefte
