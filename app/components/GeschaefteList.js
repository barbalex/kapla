import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import styles from './GeschaefteList.css'
import Toolbar from '../containers/Toolbar.js'

class Geschaefte extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired
  }

  listElements () {
    const { geschaefte } = this.props
    return geschaefte.map((geschaeft, index) => (
        <Row key={index}>
          <Col xs={1} sm={1} md={1} lg={1}><p>{geschaeft.idGeschaeft}</p></Col>
          <Col xs={8} sm={8} md={8} lg={8}><p>{geschaeft.gegenstand}</p></Col>
          <Col xs={2} sm={2} md={2} lg={2}><p>{geschaeft.status}</p></Col>
          <Col xs={1} sm={1} md={1} lg={1}><p>{geschaeft.idKontaktIntern}</p></Col>
        </Row>
      )
    )
  }

  render() {
    return (
      <div className='geschaefteList'>
        <Toolbar />
        <div className={styles.backButton}>
          <Link to='/'>
            <i className='fa fa-arrow-left fa-3x' />
          </Link>
        </div>
        <div className={styles.grid}>
          <Grid>
            {this.listElements()}
          </Grid>
        </div>
      </div>
    )
  }
}

export default Geschaefte
