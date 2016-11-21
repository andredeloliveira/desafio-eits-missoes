import React from 'react';
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
    const { name, image, label } = this.props;
    return (
      <div>
        <Card style={cardStyle}>
         <CardMedia>
           <img src={image} />
         </CardMedia>
         <CardActions>
           <FlatButton label={label} style={flatButtonStyle}/>
         </CardActions>
       </Card>
     </div>
    )
  }
}
