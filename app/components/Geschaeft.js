import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './Counter.css'
import Navbar from '../containers/Navbar.js'

class Geschaeft extends Component {
  static propTypes = {
    holenGeschaefte: PropTypes.func.isRequired,
    filtereGeschaefteNachFeldern: PropTypes.func.isRequired,
    filtereGeschaefteNachVolltext: PropTypes.func.isRequired,
    geschaefte: PropTypes.array.isRequired,
    filterFields: PropTypes.object,
    filterFulltext: PropTypes.string
  }

  render() {
    const {
      holenGeschaefte,
      filtereGeschaefteNachFeldern,
      filtereGeschaefteNachVolltext,
      filterFields,
      filterFulltext,
      geschaefte
    } = this.props

    return (
      <div>
        <Navbar />
        <div className={styles.backButton}>
          <Link to='/'>
            <i className='fa fa-arrow-left fa-3x' />
          </Link>
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={() => holenGeschaefte(filterFields, filterFulltext)}>hole</button>
          <button className={styles.btn} onClick={() => filtereGeschaefteNachFeldern({benutzer: 'Peter', aktenstandort: 'W102'})}>filtere 1</button>
          <button className={styles.btn} onClick={() => filtereGeschaefteNachFeldern({aktennummer: 4})}>filtere nummer</button>
          <button className={styles.btn} onClick={() => filtereGeschaefteNachVolltext('Bolleter')}>filtere volltext</button>
          <button className={styles.btn} onClick={() => filtereGeschaefteNachFeldern({})}>alle</button>
        </div>
      </div>
    )
  }
}

export default Geschaeft
