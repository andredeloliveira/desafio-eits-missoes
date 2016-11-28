import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export class Formfeedback extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.closeFeedback = this.closeFeedback.bind(this);
  }

  closeFeedback() {
    this.setState({
      open: false,
    })
  }

  componentDidMount() {
    this.setState({
      open: true,
    })
  }
  //TODO(andredeloliveira): Add property to handle error and show an option to contact system admin
  render() {
    const { message, duration } = this.props;
    return (
      <Snackbar
          open={this.state.open}
          message={message}
          autoHideDuration={duration}
          onRequestClose={this.closeFeedback}
      />
    )
  }

}
