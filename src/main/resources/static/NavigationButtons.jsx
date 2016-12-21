/**
 Renders the app's navigation buttons
**/

import React from 'react';
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton';
import Button from 'muicss/lib/react/button';
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
          <Link to="/aeronaves"><Button color="primary">Aeronaves</Button></Link>
          <Link to="/usuarios"><Button color="primary">Usuários</Button></Link>
          <Link to="/missoes"><Button color="primary">Missões</Button></Link>
      </div>
    )
  }
}
