import React, { Component, PropTypes } from 'react'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import NavigationMenuIcon from 'material-ui/lib/svg-icons/navigation/menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'

class MyToolbar extends Component {
  static propTypes = {
    holenDb: PropTypes.func.isRequired,
    username: PropTypes.string
  }

  render() {
    const {
      holenDb,
      username
    } = this.props

    return (
      <Toolbar>
        <ToolbarGroup firstChild={true} float='left'>
          <DropDownMenu value={3}>
            <MenuItem value={1} primaryText='All Broadcasts' />
            <MenuItem value={2} primaryText='All Voice' />
            <MenuItem value={3} primaryText='All Text' />
            <MenuItem value={4} primaryText='Complete Voice' />
            <MenuItem value={5} primaryText='Complete Text' />
            <MenuItem value={6} primaryText='Active Voice' />
            <MenuItem value={7} primaryText='Active Text' />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup float='right'>
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationMenuIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText='Datenbank wählen' onClick={holenDb} />
            <MenuItem primaryText='More Info' />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default MyToolbar
