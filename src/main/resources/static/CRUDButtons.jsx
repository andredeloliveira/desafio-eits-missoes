import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import { AirplaneForm } from './AirplaneForm.jsx';
import { MissionForm } from './MissionForm.jsx';
import { UserForm } from './UserForm.jsx';
import { AirplaneDetails } from './AirplaneDetails.jsx';
import { MissionDetails } from './MissionDetails.jsx';
import { UserDetails } from './UserDetails.jsx';
import { hashHistory } from 'react-router'

export class UpdateButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.update = this.update.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderEditForm = this.renderEditForm.bind(this);
  }

  handleClose() {
    this.setState({
      open: false,
    })
  }

  renderEditForm() {
    const { name, data } = this.props;
    if (name === 'aeronaves') {
      return (
        <AirplaneForm
          handleCloseDialog={this.handleClose}
          edit={true}
          airplane={data}
        />
      )
    } else if (name === 'missoes') {
      return (
        <MissionForm
          handleCloseDialog={this.handleClose}
          edit={true}
          mission={data}
        />
      )
    } else if ( name === 'usuarios') {
      return (
        <UserForm
          handleCloseDialog={this.handleClose}
          edit={true}
          user={data}
        />
      )
    }
  }

  update() {
    const { data, name } = this.props;
    hashHistory.push('/'+ name +'/update/'+ data.id);
  }

  render() {
    const { data } = this.props;
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
    this.remove = this.remove.bind(this);
  }

  remove() {
    const { actions, data, dispatch } = this.props;
    //execute the action passed with the data (if needed)
    if (data) {
      actions.remove(data, dispatch);
    } else {
      action();
    }
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

  redirectToDetailsPage() {
    const { name, data } = this.props;
    hashHistory.push('/'+ name +'/detalhes/'+ data.id);
  }

  render() {
    return (
      <IconButton  onTouchTap={this.redirectToDetailsPage.bind(this)}>
        <ActionVisibility />
      </IconButton>
    )
  }
}
