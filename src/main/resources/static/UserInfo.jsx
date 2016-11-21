import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';


//TODO(andredeloliveira): Make this component responsible for all the user login
export class UserInfo extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    const { centerStyle } = this.props;
    return (
      <Card>
       <CardHeader
         title="Bem-vindo!"
         subtitle="Usuário"
       />
      <CardMedia>
         <img src="https://api.adorable.io/avatars/200/abott@adorable.io.png" />
       </CardMedia>
       <CardText>
          Escolha uma opção
       </CardText>
       <CardActions>
         <MenuItem style={centerStyle}>Entrar</MenuItem>
       </CardActions>
     </Card>
    )
  }

}
