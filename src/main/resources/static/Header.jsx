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
import { connect } from 'react-redux';


@connect((Store) => {
  return {
    login: Store.loginReducer,
  }
})
export class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      logged: true,
      open: false
    }
    this.showDrawer = this.showDrawer.bind(this);
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
      margin: "0 auto",
      width: "100%"
    }

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const loggedIn = sessionStorage.getItem('loggedIn');
    return (
      <div>
        <AppBar title="gAviator"
                onLeftIconButtonTouchTap={this.showDrawer.bind(this, this.state.open)}
        />
        <Drawer open={this.state.open}>
          <MenuItem
            onTouchTap={this.showDrawer.bind(this, this.state.open)}
            rightIcon={<NavigationClose />}
            style={sideBarStyle} />
          <UserInfo style={sideBarStyle} loggedIn={loggedIn} userInfo={currentUser}/>
        </Drawer>
      </div>
    )
  }
}
