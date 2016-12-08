import React from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { LoginForm } from './LoginForm.jsx';



@connect((Store) => {
  return {
    login: Store.loginReducer,
  }
})
export class UserInfo extends React.Component {

  constructor(props) {
    super(props);

  }
  logout() {
    sessionStorage.setItem('currentUser', null);
    sessionStorage.setItem('loggedIn', null);
  }
  render() {
    const { centerStyle, loggedIn, userInfo } = this.props;
    let userName = 'Usuário';
    //const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const { currentUser } = this.props.login;
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
         {currentUser ? <FlatButton label="Sair" onTouchTap={this.logout} /> : <LoginForm />}
       </CardActions>
     </Card>
    )
  }

}
