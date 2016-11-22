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
      width: "200px",
      height: "250px",
      marginTop: "100px"
    }
    const flatButtonStyle = {
      width: "100%"
    }
    const { name, image, label, url } = this.props;
    return (
      <div>
        <Card style={cardStyle}>
         <CardMedia>
           <img src={image} />
         </CardMedia>
         <CardActions>
            <Link to={url}><FlatButton label={label} style={flatButtonStyle} /></Link>
         </CardActions>
       </Card>
     </div>
    )
  }
}
