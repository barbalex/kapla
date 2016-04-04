import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import ReactList from 'react-list'
import Navbar from '../containers/Navbar.js'
import ModalGeschaeftDelete from '../containers/ModalGeschaeftDelete.js'
import styles from './Geschaefte.css'

class Geschaefte extends Component {
  static propTypes = {
    geschaefte: PropTypes.array.isRequired,
    fetchUsername: PropTypes.func.isRequired,
    username: PropTypes.string,
    holeDbAusConfig: PropTypes.func.isRequired,
    filterFields: PropTypes.object,
    filterFulltext: PropTypes.string,
    holenGeschaefte: PropTypes.func.isRequired,
    holenGeschaeft: PropTypes.func.isRequired,
    willDeleteGeschaeft: PropTypes.bool
  }

  componentDidMount () {
    const { fetchUsername, holeDbAusConfig, holenGeschaefte, filterFields, filterFulltext } = this.props
    fetchUsername()
    holeDbAusConfig()
    holenGeschaefte(filterFields, filterFulltext)
  }

  onClickGeschaeft (idGeschaeft) {
    const { holenGeschaeft } = this.props
    console.log('geschaeft clicked, id:', idGeschaeft)
    holenGeschaeft(idGeschaeft)
  }

  renderItem (index, key) {
    const { geschaefte, geschaeft } = this.props
    const isActive = geschaeft && geschaeft.idGeschaeft && geschaeft.idGeschaeft === geschaefte[index].idGeschaeft
    const className = isActive ? [styles.row, styles.active].join(' ') : styles.row
    return (
      <Row
        key={key}
        className={className}
        onClick={this.onClickGeschaeft.bind(this, geschaefte[index].idGeschaeft)}
      >
        <Col xs={1} sm={1} md={1} lg={1}>{geschaefte[index].idGeschaeft}</Col>
        <Col xs={8} sm={8} md={8} lg={8}>{geschaefte[index].gegenstand}</Col>
        <Col xs={2} sm={2} md={2} lg={2}>{geschaefte[index].status}</Col>
        <Col xs={1} sm={1} md={1} lg={1}>{geschaefte[index].idKontaktIntern}</Col>
      </Row>
    )
  }

  renderItems (items, ref) {
    return (
      <Grid ref={ref}>
        {items}
      </Grid>
    )
  }

  render() {
    const { geschaefte, willDeleteGeschaeft } = this.props
    console.log('Geschaefte.js, willDeleteGeschaeft', willDeleteGeschaeft)
    return (
      <div className = {styles.body}>
        <Navbar />
        {willDeleteGeschaeft && <ModalGeschaeftDelete />}
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
