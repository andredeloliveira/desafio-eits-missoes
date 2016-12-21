/*
  Renders the App's Header, where all the links and login functionalities are inclueded
  @see User (Java)
*/

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
import cookie from 'react-cookie';
import { LoginForm } from './LoginForm.jsx';
import { UserInfo } from './UserInfo.jsx';
import { connect } from 'react-redux';
import { NavigationButtons } from './NavigationButtons.jsx';
import { logout } from './actions/loginActions';

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
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { dispatch } = this.props;
    dispatch(logout())
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

    //const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const currentUser = this.props.login.currentUser || cookie.load('currentUser');
    return (
      <div>
        <AppBar title="gAviator"
                onLeftIconButtonTouchTap={this.showDrawer.bind(this, this.state.open)}
                iconElementRight={currentUser ? <NavigationButtons /> : null}
        />
        <Drawer open={this.state.open}>
          <MenuItem
            onTouchTap={this.showDrawer.bind(this, this.state.open)}
            rightIcon={<NavigationClose />}
            style={sideBarStyle} />
          <UserInfo style={sideBarStyle} currentUser={currentUser}/>
          {currentUser ? <FlatButton label="Sair" onTouchTap={this.logout} /> : <LoginForm />}
        </Drawer>
      </div>
    )
  }
}
