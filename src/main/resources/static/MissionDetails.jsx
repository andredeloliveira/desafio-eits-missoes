import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { findMissionPlannerByMission, findMissionPassengersByMission } from './actions/missionActions';
import { MissoesLoading } from './MissoesLoading.jsx';
@connect((Store) => {
  return {
    missions: Store.missionReducer,
  }
})
export class MissionDetails extends React.Component {

  constructor(props) {
    super(props);
    this.passengersRender = this.passengersRender.bind(this);
  }

  componentWillMount() {
    moment.locale('pt-br');
    const { mission, dispatch } = this.props;
    if (mission) {
      dispatch(findMissionPlannerByMission(mission, dispatch))
      dispatch(findMissionPassengersByMission(mission, dispatch))
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

  render() {
    const { mission } = this.props;
    const { missionPlanner } = this.props.missions;
    console.log(this.props)
    const labelStyle = {
      fontSize: "1.2em",
    }
    const spanStyle = {
      fontSize: "2.2em",
      paddingLeft: "40px"
    }
    const elementContainer = {
      paddingBottom: "10px",
    }
    return (
      <div>
        <div style={elementContainer}>
          <label style={labelStyle}>Data/Hora</label><span style={spanStyle}>{moment(mission.dateTime).format('lll')}</span>
        </div>
        <div style={elementContainer}>
          <label style={labelStyle}>Aeronave</label><span style={spanStyle}>{mission.airplane.subscriptionNumber + ' - ' + mission.airplane.airplaneModel.name}</span>
        </div>
        <div style={elementContainer}>
          <label style={labelStyle}>Origem</label><span style={spanStyle}>{mission.missionTo.acronym + ' - ' + mission.missionTo.name}</span>
        </div>
        <div style={elementContainer}>
          <label style={labelStyle}>Destino</label><span style={spanStyle}>{mission.missionFrom.acronym + ' - ' + mission.missionFrom.name}</span>
        </div>
        <div style={elementContainer}>
          <label style={labelStyle}>Planejado por</label><span style={spanStyle}>{missionPlanner ? missionPlanner.planner.name : 'Carregando..'}</span>
        </div>
        <div style={elementContainer}>
          <label style={labelStyle}>Passageiros</label>
          <ul>{ this.passengersRender() }</ul>
        </div>
      </div>
    )
  }
}
