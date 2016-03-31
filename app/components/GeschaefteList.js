import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './Counter.css'

class Geschaefte extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired
  }

  listElements () {
    const { geschaefte } = this.props
    return geschaefte.map((geschaeft) => (
        <p>{geschaeft.idGeschaeft}</p>
      )
    )
  }

  render() {
    return (
      <div>
        <div className={styles.backButton}>
          <Link to='/'>
            <i className='fa fa-arrow-left fa-3x' />
          </Link>
        </div>
        {this.listElements()}
      </div>
    )
  }
}

export default Geschaefte
