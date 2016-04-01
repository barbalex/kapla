import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import ReactList from 'react-list'
import styles from './GeschaefteList.css'
import Toolbar from '../containers/Toolbar.js'

class Geschaefte extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired
  }

  renderItem(index, key) {
    const { geschaefte } = this.props
    return (
      <Row key={key}>
        <Col xs={1} sm={1} md={1} lg={1}><p>{geschaefte[index].idGeschaeft}</p></Col>
        <Col xs={8} sm={8} md={8} lg={8}><p>{geschaefte[index].gegenstand}</p></Col>
        <Col xs={2} sm={2} md={2} lg={2}><p>{geschaefte[index].status}</p></Col>
        <Col xs={1} sm={1} md={1} lg={1}><p>{geschaefte[index].idKontaktIntern}</p></Col>
      </Row>
    )
  }

  render() {
    const { geschaefte } = this.props
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
            <ReactList
              itemRenderer={::this.renderItem}
              length={geschaefte.length}
              type='variable'
            />
          </Grid>
        </div>
      </div>
    )
  }
}

export default Geschaefte
