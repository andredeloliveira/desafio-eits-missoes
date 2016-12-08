import React from 'react';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux';
import { insertUpdateUser } from './actions/userActions';


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
    let { user, dispatch } = this.props;
    user.status = false;
    console.log(user);
    dispatch(insertUpdateUser(user, dispatch))
  }

  isUserActive() {
    const { user } = this.props;
    return user.status === 'ATIVO';
  }

  render() {
    const { user } = this.props;
    return (
      <Toggle
       defaultToggled={this.isUserActive()}
       onToggle={this.deactivateUser}
     />
    )
  }

}
