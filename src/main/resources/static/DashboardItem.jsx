/*
  An item that can be rendered inside the dashboard. It is defined by Cards
*/
import React from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


export class DashboardItem extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    const cardStyle = {
      height: "250px",
      marginTop: "100px"
    }
    const flatButtonStyle = {
      width: "100%"
    }
    const { name, icon, label, url } = this.props;
    return (
      <div>
        <Card style={cardStyle}>
         <CardMedia>
           {icon}
         </CardMedia>
         <CardActions>
            <Link to={url}><FlatButton label={label} style={flatButtonStyle} /></Link>
         </CardActions>
       </Card>
     </div>
    )
  }
}
