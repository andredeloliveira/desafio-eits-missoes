import React from 'react';
import IconButton from 'material-ui/IconButton';
import NotificationDoNotDisturbAlt from 'material-ui/svg-icons/notification/do-not-disturb-alt';
export class DeactivateUserButton extends React.Component {

  constructor(props) {
    super(props);
  }

  deactivateUser() {
    console.log('a user has been deactivated')
  }

  render() {
    return (
      <IconButton onTouchTap={this.deactivateUser}>
        <NotificationDoNotDisturbAlt />
      </IconButton>
    )
  }

}
