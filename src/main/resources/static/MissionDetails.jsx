import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { findMissionPlannerByMission, findMissionPassengersByMission, findMissionPilotsByMission } from './actions/missionActions';
import { MissoesLoading } from './MissoesLoading.jsx';
import Divider from 'material-ui/Divider';

@connect((Store) => {
  return {
    missions: Store.missionReducer,
  }
})
export class MissionDetails extends React.Component {

  constructor(props) {
    super(props);
    this.passengersRender = this.passengersRender.bind(this);
    this.pilotsRender = this.pilotsRender.bind(this);
  }

  componentWillMount() {
    moment.locale('pt-br');
    const { mission, dispatch } = this.props;
    if (mission) {
      dispatch(findMissionPlannerByMission(mission, dispatch))
      dispatch(findMissionPassengersByMission(mission, dispatch))
      dispatch(findMissionPilotsByMission(mission, dispatch))
    }
  }

  passengersRender() {
    const { missionPassengers } = this.props.missions;
    if (missionPassengers) {
      return missionPassengers.map((missionPassenger) => {
        return <li key={missionPassenger.id}>{missionPassenger.passenger.name}</li>
      })
    } else {
      return <MissoesLoading />
    }
  }

  pilotsRender() {
    const { missionPilots } = this.props.missions;
    if (missionPilots) {
      return missionPilots.map((missionPilot) => {
        return <li key={missionPilot.id}>{missionPilot.pilot.name}</li>
      })
    }
  }

  render() {
    const { mission } = this.props;
    const { missionPlanner } = this.props.missions;
    const labelStyle = {
      fontSize: "1.2em",
    }
    const spanStyle = {
      fontSize: "2.2em",
      paddingLeft: "40px"
    }
    const elementContainer = {
      padding: "10px",
    }
    return (
      <div>
        <div style={elementContainer}>
          <label style={labelStyle}>Data/Hora:</label><span style={spanStyle}>{moment(mission.dateTime).format('lll')}</span>
        </div>
        <Divider />
        <div style={elementContainer}>
          <label style={labelStyle}>Aeronave:</label><span style={spanStyle}>{mission.airplane.subscriptionNumber + ' - ' + mission.airplane.airplaneModel.name}</span>
        </div>
        <Divider />
        <div style={elementContainer}>
          <label style={labelStyle}>Origem:</label><span style={spanStyle}>{mission.missionTo.acronym + ' - ' + mission.missionTo.name}</span>
        </div>
        <Divider />
        <div style={elementContainer}>
          <label style={labelStyle}>Destino:</label><span style={spanStyle}>{mission.missionFrom.acronym + ' - ' + mission.missionFrom.name}</span>
        </div>
        <Divider />
        <div style={elementContainer}>
          <label style={labelStyle}>Planejado por:</label><span style={spanStyle}>{missionPlanner ? missionPlanner.planner.name : 'Carregando..'}</span>
        </div>
        <Divider />
        <div style={elementContainer}>
          <label style={labelStyle}>Passageiros:</label>
          <ul>{ this.passengersRender() }</ul>
        </div>
        <Divider />
        <div style={elementContainer}>
          <label style={labelStyle}>Pilotos:</label>
          <ul>{ this.pilotsRender() }</ul>
        </div>
      </div>
    )
  }
}
