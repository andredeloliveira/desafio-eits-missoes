import React from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import { UserInfo } from './UserInfo.jsx';

export class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      logged: true,
      open: false
    }
    console.log(this.state)
  }

  handleToggle(logged, event) {
    this.setState({
      logged: logged
    })
  }

  showDrawer(open, event) {
    event.preventDefault();
    this.setState({
      open: !open
    })
  }


  render() {
    const sideBarStyle = {
      display: "table",
      margin: "0 auto"
    }
    return (
      <div>
        <AppBar title="gAviator"
                onLeftIconButtonTouchTap={this.showDrawer.bind(this, this.state.open)}
        />
        <Drawer open={this.state.open}>
          <MenuItem onTouchTap={this.showDrawer.bind(this, this.state.open)} rightIcon={<NavigationClose />} style={sideBarStyle}></MenuItem>
          <UserInfo style={sideBarStyle}/>
        </Drawer>
      </div>
    )
  }
}
