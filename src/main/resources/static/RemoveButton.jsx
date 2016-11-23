import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
export class RemoveButton extends React.Component {

  constructor(props) {
    super(props);
  }

  remove() {
    console.log('something has been removed')
  }

  render() {
    return (
      <IconButton  onTouchTap={this.remove}>
        <ContentRemoveCircle />
      </IconButton>
    )
  }

}
