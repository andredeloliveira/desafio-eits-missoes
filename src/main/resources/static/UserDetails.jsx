import React from 'react';
import { connect } from 'react-redux';
import Container from 'muicss/lib/react/container';
import { MissoesLoading } from './MissoesLoading.jsx';
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

  render() {
    const { user } = this.props.users;
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
    if (!user) {
      return <MissoesLoading />
    }
    return (
      <Container>
        <h1>Detalhes do usuário</h1>
        <div style={elementContainer}>
          <label style={labelStyle}>Nome</label><span style={spanStyle}>{user.name}</span>
        </div>
        <div style={elementContainer}>
          <label style={labelStyle}>E-mail</label><span style={spanStyle}>{user.email}</span>
        </div>
        <div style={elementContainer}>
          <label style={labelStyle}>Perfil</label><span style={spanStyle}>{user.perfilAcesso}</span>
        </div>
        <div style={elementContainer}>
          <label style={labelStyle}>Status</label><span style={spanStyle}>{user.status ? 'ATIVO' : 'INATIVO'}</span>
        </div>
      </Container>
    )

  }
}
