/*
  Button that has the functionality of Deactivate or Activate an User
*/
import React from 'react';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux';
import { updateUser } from './actions/userActions';
import { searchUser } from './actions/searchActions';
import { logout } from './actions/loginActions';
import cookie from 'react-cookie';

@connect((Store) => {
  return {
    users: Store.userReducer,
    login: Store.loginReducer,
  }
})
export class DeactivateUserButton extends React.Component {

  constructor(props) {
    super(props);
    this.deactivateUser = this.deactivateUser.bind(this)
  }

  deactivateUser() {
    const {  dispatch, params } = this.props;
    const currentUser = this.props.login.currentUser || cookie.load('currentUser');
    let user = this.props.user;
    let newUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      perfilAcesso: user.perfilAcesso,
      password: user.password,
      status: ! user.status
    }
    if (currentUser.id === user.id) {
      dispatch(updateUser(newUser, dispatch))
      dispatch(logout())
    } else {
      dispatch(updateUser(newUser, dispatch))
    }
  }

  isUserActive() {
    const { user } = this.props;
    return user.status;
  }

  render() {
    const { user, isAdmin, style, label } = this.props;
    return (
      <Toggle
       label={label}
       style={style}
       defaultToggled={this.isUserActive()}
       onToggle={this.deactivateUser}
       disabled={!isAdmin}
     />
    )
  }

}
