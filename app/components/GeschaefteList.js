import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import styles from './Counter.css'
import Toolbar from '../containers/Toolbar.js'

class Geschaefte extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired
  }

  listElements () {
    const { geschaefte } = this.props
    return geschaefte.map((geschaeft) => (
        <Row>
          <Col xs={1}><p>{geschaeft.idGeschaeft}</p></Col>
          <Col xs={8}><p>{geschaeft.gegenstand}</p></Col>
          <Col xs={2}><p>{geschaeft.status}</p></Col>
          <Col xs={1}><p>{geschaeft.idKontaktIntern}</p></Col>
        </Row>
      )
    )
  }

  render() {
    return (
      <div>
        <Toolbar />
        <div className={styles.backButton}>
          <Link to='/'>
            <i className='fa fa-arrow-left fa-3x' />
          </Link>
        </div>
        <Grid>
          {this.listElements()}
        </Grid>
      </div>
    )
  }
}

export default Geschaefte
