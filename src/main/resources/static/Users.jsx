import React from 'react';
import { connect } from 'react-redux';
import { CRUDBaseComponent } from './CRUDBaseComponent.jsx';
import { Formfeedback } from './Formfeedback.jsx';
import { findAllUsers } from './actions/userActions';


export class Users extends React.Component {

  constructor(props){
    super(props)
  }


  render() {
    const { users } = this.props;
    return (
      <div>
        <CRUDBaseComponent label="Usuários" name="usuarios" data={users}/>
      </div>
    )
  }
}
