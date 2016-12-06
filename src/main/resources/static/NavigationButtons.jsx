import React from 'react';
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton';
export class NavigationButtons extends React.Component {

  constructor(props) {
    super(props)

  }

  render() {
    const itemMenuStyle = {
      margin: "5px",
      padding: "5px",
    }
    return (
      <div>
          <FlatButton style={itemMenuStyle} href="/missoes/#/aeronaves" label="Aeronaves" />
          <FlatButton style={itemMenuStyle} href="/missoes/#/missoes" label="Missoes" />
          <FlatButton style={itemMenuStyle} href="/missoes/#/usuarios" label="Usuários" />
      </div>
    )
  }
}
