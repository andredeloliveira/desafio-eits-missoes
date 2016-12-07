import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { AirplaneForm } from './AirplaneForm.jsx';
import { UserForm } from './UserForm.jsx';
import { MissionForm } from './MissionForm.jsx';

export class NewEntryDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
    //NOTE(andredeloliveira): binding function, so we don't lose this component's scope
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(){
    this.setState({
      open: true
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  renderProperForm(name) {
    if (name === 'airplane') {
      return <AirplaneForm handleCloseDialog={this.handleClose} />
    } else if (name === 'mission') {
      return <MissionForm  handleCloseDialog={this.handleClose} />
    }else if(name === 'user'){
      return <UserForm handleCloseDialog={this.handleClose} />
    }
  }


  render() {
    const fabStyle = {
      marginRight: '20px',
      float: 'right',
    }
    const dialogStyle = {
      overflow: "hidden",
    }
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ]
    const { name } = this.props;
    return (
      <div>
        <FloatingActionButton secondary={false} style={fabStyle} onTouchTap={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          style={dialogStyle}
        >
          { this.renderProperForm(name) }
        </Dialog>
      </div>
    )
  }



}
