import React from 'react';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux';
import { updateUser } from './actions/userActions';


@connect((Store) => {
  return {
    users: Store.userReducer,
  }
})
export class DeactivateUserButton extends React.Component {

  constructor(props) {
    super(props);
    this.deactivateUser = this.deactivateUser.bind(this)
  }

  deactivateUser() {
    const {  dispatch } = this.props;
    let user = this.props.user;
    let newUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      perfilAcesso: user.perfilAcesso,
      password: user.password,
      status: ! user.status
    }
    dispatch(updateUser(newUser, dispatch))
  }

  isUserActive() {
    const { user } = this.props;
    return user.status;
  }

  render() {
    const { user } = this.props;
    console.log(user)
    return (
      <Toggle
       defaultToggled={this.isUserActive()}
       onToggle={this.deactivateUser}
     />
    )
  }

}
