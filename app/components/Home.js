import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { SortablePane, Pane } from 'react-sortable-pane'
import styles from './Home.css'
import Toolbar from '../containers/Toolbar.js'
import GeschaefteList from '../containers/GeschaefteList.js'

export default class Home extends Component {
  static propTypes = {
    fetchUsername: PropTypes.func.isRequired,
    username: PropTypes.string,
    holeDbAusConfig: PropTypes.func.isRequired,
    filterFields: PropTypes.object,
    filterFulltext: PropTypes.string,
    holenGeschaefte: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { fetchUsername, holeDbAusConfig, holenGeschaefte, filterFields, filterFulltext } = this.props
    fetchUsername()
    holeDbAusConfig()
    holenGeschaefte(filterFields, filterFulltext)
  }

  onResizePane (data) {
    console.log('data from resizing', data)
  }

  render () {
    const { username } = this.props
    return (
      <div>
        <Toolbar />
        <SortablePane
          direction = "vertical"
          margin = {10}
          onResize = {this.onResizePane}
          onOrderChange = {(panes) => null}
          isResizable = {{x: true, y: false, xy: false}}
          disableEffect = {true}
        >
          <Pane
            id = {1}
            width = {700}
            className = {[styles.pane, styles.paneGeschaefteList].join(' ')}
          >
            <GeschaefteList />
          </Pane>
          <Pane
            id = {2}
            className={[styles.pane, styles.paneGeschaeft].join(' ')}
           >
            <p>{username}</p>
          </Pane>
        </SortablePane>
      </div>
    )
  }
}
