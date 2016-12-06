import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionFlightLand from 'material-ui/svg-icons/action/flight-land';
export class FinishFlightButton extends React.Component {

  constructor(props) {
    super(props);
    this.finishFlight = this.finishFlight.bind(this);
  }

  finishFlight() {
    const { mission } = this.props;
    const currentDateTime = new Date();
    const currentDay = currentDateTime.getDate();
    const currentMonth = currentDateTime.getMonth();
    const currentYear = currentDateTime.getFullYear();
    const currentHours = currentDateTime.getHours();
    const currentMinutes = currentDateTime.getMinutes();
    const currentSeconds = currentDateTime.getSeconds();
    console.log(mission.dateTime)
  }
  render() {
    return (
      <IconButton onTouchTap={this.finishFlight}>
        <ActionFlightLand />
      </IconButton>
    )
  }

}
