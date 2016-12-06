import React from 'react';

export class UserDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    const labelStyle = {
      fontSize: "1.2em",
    }
    const spanStyle = {
      fontSize: "2.2em",
      paddingLeft: "40px"
    }
    const elementContainer = {
      paddingBottom: "10px",
    }
    return (
      <div>
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
      </div>
    )
  }
}
