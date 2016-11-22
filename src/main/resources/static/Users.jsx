import React from 'react';
import { CRUDBaseComponent } from './CRUDBaseComponent.jsx';

export class Users extends React.Component {

  render() {
    return (
      <div>
        <CRUDBaseComponent label="Usuários" name="user"/>
      </div>
    )
  }
}
