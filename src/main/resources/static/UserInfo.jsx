/*
  Renders the Logged in user's info
*/
import React from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';


export class UserInfo extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    const { centerStyle, loggedIn, userInfo } = this.props;
    let userName = 'Usuário';
    //const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const { currentUser } = this.props;
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
     </Card>
    )
  }

}
