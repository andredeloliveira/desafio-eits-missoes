import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';

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

export class DetailsButton extends React.Component {
  constructor(props) {
    super(props);
  }

  showDetails() {
    console.log('showingup details')
  }

  render() {
    return (
      <IconButton  onTouchTap={this.showDetails}>
        <ActionVisibility />
      </IconButton>
    )
  }
}
