import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { LoginForm } from './LoginForm.jsx';


//TODO(andredeloliveira): Make this component responsible for all the user login
export class UserInfo extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    const { centerStyle, loggedIn, userInfo } = this.props;
    let userName = 'Usuário';
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
      userName = currentUser.name
    }
    return (
      <Card>
       <CardHeader
         title="Bem-vindo!"
         subtitle={userName}
       />
      <CardMedia>
         <img src="https://api.adorable.io/avatars/200/abott@adorable.io.png" />
       </CardMedia>
       <CardActions>
         {currentUser ? <FlatButton label="Sair" /> : <LoginForm />}
       </CardActions>
     </Card>
    )
  }

}
