import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
export class UpdateButton extends React.Component {

  constructor(props) {
    super(props);
  }

  update() {
    console.log('something was updated')
  }

  render() {
    return (
      <IconButton onTouchTap={this.update}>
        <ContentCreate />
      </IconButton>
    )
  }
}
