import React from 'react';
import { connect } from 'react-redux';
import { CRUDBaseComponent } from './CRUDBaseComponent.jsx';
import { Formfeedback } from './Formfeedback.jsx';
import { findAllUsers } from './actions/userActions';

@connect((Store) => {
  return {
    users: Store.userReducer
  }
})
export class Users extends React.Component {

  constructor(props){
    super(props)
    this.renderFeedback = this.renderFeedback.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(findAllUsers(dispatch))
  }

  renderFeedback() {
    const { users } = this.props;
    if (users.removed) {
      return (
        <Formfeedback
          message={"Usuário removido com sucesso"}
          duration={3000}
        />
      )
    } else if (users.newUser) {
      return (
        <Formfeedback
          message={"User " + users.newUser.name + " inserido"}
          duration={3000}
        />
      )
    } else {
      return null;
    }
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <CRUDBaseComponent label="Usuários" name="usuarios" data={users}/>
        {this.renderFeedback()}
      </div>
    )
  }
}
