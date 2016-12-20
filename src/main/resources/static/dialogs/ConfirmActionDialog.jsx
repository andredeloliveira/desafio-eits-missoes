import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Button from 'muicss/lib/react/button';

export class ConfirmActionDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    this.setState({ open: true,})
  }

  handleClose() {
    this.setState({ open: false,})
  }

  handleRemoveItem() {
    const { action, itemId, dispatch, shouldGoBack } = this.props;
    const objectContainerForAction = {
      id: itemId,
    }
    dispatch(action(objectContainerForAction, dispatch))
    if (shouldGoBack) {
      hashHistory.goBack();
    }
  }

  render() {
    const { itemName, message, actionLabel, customButton, isAdmin } = this.props;
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
        <Button variant="flat" color="danger" disabled={!isAdmin} onClick={this.handleOpen}>{actionLabel}</Button>
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
