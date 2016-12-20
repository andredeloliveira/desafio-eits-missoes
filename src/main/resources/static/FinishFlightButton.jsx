import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ActionFlightLand from 'material-ui/svg-icons/action/flight-land';
import { finishFlight } from './actions/missionActions';

@connect((Store) => {
  return {
    missions: Store.missionReducer,
  }
})
export class FinishFlightButton extends React.Component {

  constructor(props) {
    super(props);
    this.finishFlight = this.finishFlight.bind(this);
  }

  finishFlight() {
    const { dispatch, mission } = this.props;
    dispatch(finishFlight(mission, dispatch))
  }
  render() {
    const { mission } = this.props;
    let disabled = false;
    const currentDate = new Date().getTime();
    const missionDate = new Date(mission.dateTime).getTime();
    if (currentDate < missionDate || mission.finished) {
      disabled = true;
    }
    return (
      <IconButton onTouchTap={this.finishFlight} disabled={disabled}>
        <ActionFlightLand />
      </IconButton>
    )
  }

}
