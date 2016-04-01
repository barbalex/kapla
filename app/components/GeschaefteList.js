import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import ReactList from 'react-list'
import styles from './GeschaefteList.css'
import Toolbar from '../containers/Toolbar.js'

class Geschaefte extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    filterFields: PropTypes.object,
    filterFulltext: PropTypes.string,
    holenGeschaefte: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { holenGeschaefte, filterFields, filterFulltext } = this.props
    holenGeschaefte(filterFields, filterFulltext)
  }

  renderItem(index, key) {
    const { geschaefte } = this.props
    return (
      <Row key={key} className={styles.row}>
        <Col xs={1} sm={1} md={1} lg={1}>{geschaefte[index].idGeschaeft}</Col>
        <Col xs={8} sm={8} md={8} lg={8}>{geschaefte[index].gegenstand}</Col>
        <Col xs={2} sm={2} md={2} lg={2}>{geschaefte[index].status}</Col>
        <Col xs={1} sm={1} md={1} lg={1}>{geschaefte[index].idKontaktIntern}</Col>
      </Row>
    )
  }

  renderItems(items, ref) {
    return (
      <Grid ref={ref}>
        {items}
      </Grid>
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
          <ReactList
            itemRenderer={::this.renderItem}
            length={geschaefte.length}
            type='variable'
          />
        </div>
      </div>
    )
  }
}

export default Geschaefte
