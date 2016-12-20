import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Button from 'muicss/lib/react/button';
import Toggle from 'material-ui/Toggle';
import { deactivateActivateUser } from '../actions/userActions';

@connect((Store) => {
  return {
    users: Store.userReducer,
  }
})
export class ConfirmDeactivationDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen(event, value) {
    const { defaultToggled, dispatch, itemId } = this.props;
    this.setState({ open: true,})
  }

  handleClose() {
    this.setState({ open: false,})
  }

  handleRemoveItem() {
    const { dispatch, itemId } = this.props;
    const objectContainerForAction = {
      id: itemId,
    }
      dispatch(deactivateActivateUser(itemId, dispatch))
      console.log('you need to activate the user!')
    }
    if (shouldGoBack) {
      hashHistory.goBack();
    }
  }

  render() {
    const { itemName, message, actionLabel, customButton, defaultToggled } = this.props;
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Confirmar"
        primary={true}
        onTouchTap={this.handleRemoveItem.bind(this)}
      />,
    ];
    return (
      <div>
        <Toggle
          label="Ativar/Desativar"
          onToggle={this.handleOpen}
          defaultToggled={defaultToggled}
        />
        <Dialog
          title={message}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        </Dialog>
      </div>
    );
  }

}
