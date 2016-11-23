import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionFlightLand from 'material-ui/svg-icons/action/flight-land';
export class FinishFlightButton extends React.Component {

  constructor(props) {
    super(props);
  }

  finishFlight() {
    console.log('a flight was finished')
  }
  render() {
    return (
      <IconButton onTouchTap={this.finishFlight}>
        <ActionFlightLand />
      </IconButton>
    )
  }

}
