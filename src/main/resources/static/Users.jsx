import React from 'react';
import { connect } from 'react-redux';
import { CRUDBaseComponent } from './CRUDBaseComponent.jsx';
import { findAllUsers } from './actions/userActions';

@connect((Store) => {
  console.log('store value', Store)
  return {
    users: Store.userReducer
  }
})
export class Users extends React.Component {

  constructor(props){
    super(props)
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(findAllUsers(dispatch))
  }
  render() {
    const { users } = this.props;
    return (
      <div>
        <CRUDBaseComponent label="Usuários" name="user" data={users}/>
      </div>
    )
  }
}
