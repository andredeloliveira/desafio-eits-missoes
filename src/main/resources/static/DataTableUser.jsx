import React from 'react';
import { connect } from 'react-redux';
import { MuiDataTable } from 'mui-data-table';
import { MissoesLoading } from './MissoesLoading.jsx';
import { CRUDMenu } from './CRUDMenu.jsx';
import { DeactivateUserButton } from './DeactivateUserButton.jsx';
import { removeUser } from './actions/userActions';


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
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    if (currentUser.perfilAcesso === 'ADMINISTRADOR') {
      return true;
    } else {
      return false;
    }
  }

  formattedFetchedData() {
    const { dispatch, name } = this.props;
    return this.props.data.users.map( (user) => {
      if (user.status) {
        user.status = 'ATIVO'
      } else {
        user.status = 'INATIVO'
      }
      return {
        name: user.name,
        email: user.email,
        perfilAcesso: user.perfilAcesso,
        status: user.status,
        options: <CRUDMenu
                    data={user}
                    customButtons={ this.isAdmin() ? [<DeactivateUserButton key={'deactivateUserButton'} user={user}/>] : []}
                    name={name}
                    remove={removeUser}
                    dispatch={dispatch}
                  />
      }
    })
  }

  render() {
    if (!this.props.data.users) {
      return <MissoesLoading />
    }
    const config = {
      paginated: true,
      data: this.formattedFetchedData(),
      search: 'name|email|status|perfilAcesso',
      columns: [
        {
          property: 'name',
          title: 'Nome'
        },
        {
          property: 'email',
          title: 'E-mail'
        },
        {
          property: 'perfilAcesso',
          title: 'Tipo Perfil'
        },
        {
          property: 'status',
          title: 'Status'
        },
        {
          property: 'options',
          title: 'Opções'
        }
      ]
    }
    return (
      <div>
        <MuiDataTable config={config} />
      </div>
    )
  }

}
