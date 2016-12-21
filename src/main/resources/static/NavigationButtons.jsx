/**
 Renders the app's navigation buttons
**/

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
          <Link to="/aeronaves">Aeronaves</Link>
          <Link to="/usuarios">Usuários</Link>
          <Link to="/missoes">Missões</Link>
      </div>
    )
  }
}
