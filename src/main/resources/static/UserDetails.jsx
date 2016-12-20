import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import Container from 'muicss/lib/react/container';
import Divider from 'material-ui/Divider';
import Button from 'muicss/lib/react/button';
import { MissoesLoading } from './MissoesLoading.jsx';
import { DeactivateUserButton } from './DeactivateUserButton.jsx';
import { findUserById } from './actions/userActions';



@connect((Store) => {
  return {
    users: Store.userReducer,
  }
})
export class UserDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, params } = this.props;
    const userId = params.id;
    dispatch(findUserById(userId, dispatch))
  }

  goToUpdatePage() {
    const { id } = this.props.params;
    hashHistory.push('/usuarios/update/'+ id);
  }

  goBack() {
    hashHistory.goBack();
  }
  render() {
    const { user } = this.props.users;
    const { dispatch } = this.props;
    const userId = this.props.params.id;
    const labelStyle = {
      fontSize: "1.2em",
    }
    const spanStyle = {
      fontSize: "1.7em",
      paddingLeft: "40px"
    }
    const elementContainer = {
      paddingBottom: "10px",
    }
    const buttonStyle = {
      float: "right",
      marginTop: "20px",
    }
    if (!user) {
      return <MissoesLoading />
    }
    console.log()
    return (
      <Container>
        <h1>Detalhes do usuário</h1>
        <div style={elementContainer}>
          <label style={labelStyle}>Nome</label><span style={spanStyle}>{user.name}</span>
        </div>
        <Divider />
        <div style={elementContainer}>
          <label style={labelStyle}>E-mail</label><span style={spanStyle}>{user.email}</span>
        </div>
        <Divider />
        <div style={elementContainer}>
          <label style={labelStyle}>Perfil</label><span style={spanStyle}>{user.perfilAcesso}</span>
        </div>
        <Divider />
        <div style={elementContainer}>
          <label style={labelStyle}>Status</label><span style={spanStyle}>{user.status ? 'ATIVO' : 'INATIVO'}</span>
        </div>
        <Divider />
          <div style={buttonStyle}>
            <Button variant="flat" color="primary" onClick={this.goToUpdatePage.bind(this)}>Atualizar</Button>
              <DeactivateUserButton user={user} />
            <Button variant="flat" color="accent" onClick={this.goBack.bind(this)}>Cancelar</Button>
          </div>
      </Container>
    )

  }
}
