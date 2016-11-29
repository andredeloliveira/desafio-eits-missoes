import React from 'react';
import { MuiDataTable } from 'mui-data-table';
import { MissoesLoading } from './MissoesLoading.jsx';
import { CRUDMenu } from './CRUDMenu.jsx';
import { DeactivateUserButton } from './DeactivateUserButton.jsx';

export class DataTableUser extends React.Component {

  constructor(props) {
    super(props)
  }

  formattedFetchedData() {
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
        options: <CRUDMenu data={user} customButtons={[<DeactivateUserButton key={'deactivateUserButton'}/>]}/>
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
