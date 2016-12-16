import React from 'react';
import { connect } from 'react-redux';
import Input from 'muicss/lib/react/input';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { MissoesLoading } from './MissoesLoading.jsx';
import { CRUDMenu } from './CRUDMenu.jsx';
import { DeactivateUserButton } from './DeactivateUserButton.jsx';
import { removeUser, findAllUsers } from './actions/userActions';


@connect((Store) => {
  return {
    users: Store.userReducer,
  }
})
export class DataTableUser extends React.Component {

  constructor(props) {
    super(props)
    this.formattedFetchedData = this.formattedFetchedData.bind(this);
  }

  isAdmin() {
    const { currentUser } = this.props.users;
    // if (currentUser.perfilAcesso === 'ADMINISTRADOR') {
    //   return true;
    // } else {
    //   return false;
    // }
    return false;
  }

  formattedFetchedData() {
    const { dispatch, name } = this.props;
    return this.props.data.users.map( (user) => {
      if (user.status) {
        user.status = 'ATIVO'
      } else {
        user.status = 'INATIVO'
      }
      return (
          <TableRow key={user.id}>
            <TableRowColumn>{user.name}</TableRowColumn>
            <TableRowColumn>{user.email}</TableRowColumn>
            <TableRowColumn>{user.perfilAcesso}</TableRowColumn>
            <TableRowColumn>{user.status}</TableRowColumn>
            <TableRowColumn>
              <CRUDMenu
                data={user}
                customButtons={ this.isAdmin() ? [<DeactivateUserButton key={'deactivateUserButton'} user={user}/>] : []}
                name={name}
                remove={removeUser}
                find={findAllUsers}
                dispatch={dispatch}
                />
            </TableRowColumn>
          </TableRow>
      )
    })
  }

  searchUser(event) {
    console.log(event.target.value)
  }

  render() {
    if (!this.props.data.users) {
      return <MissoesLoading />
    }
    return (
      <div>
        <Input type="text" label="Buscar" onChange={this.searchUser.bind(this)} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Nome</TableHeaderColumn>
              <TableHeaderColumn>E-mail</TableHeaderColumn>
              <TableHeaderColumn>Perfil Acesso</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Opções</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.formattedFetchedData()}
          </TableBody>
        </Table>
      </div>
    )
  }

}
