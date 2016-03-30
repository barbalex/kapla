import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './Counter.css'

class Geschaefte extends Component {
  static propTypes = {
    holenGeschaefte: PropTypes.func.isRequired,
    geschaefte: PropTypes.array.isRequired
  }

  render() {
    const { holenGeschaefte, geschaefte } = this.props
    return (
      <div>
        <div className={styles.backButton}>
          <Link to='/'>
            <i className='fa fa-arrow-left fa-3x' />
          </Link>
        </div>
        <div className={`counter ${styles.counter}`}>
          {geschaefte.geschaefte}
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={() => holenGeschaefte()}>hole Geschäfte</button>
        </div>
      </div>
    )
  }
}

export default Geschaefte
