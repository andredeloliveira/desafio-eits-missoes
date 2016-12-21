/*
  Container component where all the details of a Mission are rendered.
  It also has Update, Remove and FinishFligth (Mission) actions
*/

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import cookie from 'react-cookie';
import Container from 'muicss/lib/react/container';
import Button from 'muicss/lib/react/button';
import { ConfirmActionDialog } from './dialogs/ConfirmActionDialog.jsx';
import { findMissionPlannerByMission, findMissionPassengersByMission, findMissionPilotsByMission, findMissionById, removeMission } from './actions/missionActions';
import { MissoesLoading } from './MissoesLoading.jsx';
import Divider from 'material-ui/Divider';

@connect((Store) => {
  return {
    missions: Store.missionReducer,
    login: Store.loginReducer,
  }
})
export class MissionDetails extends React.Component {

  constructor(props) {
    super(props);
    this.passengersRender = this.passengersRender.bind(this);
    this.pilotsRender = this.pilotsRender.bind(this);
    this.goToUpdatePage = this.goToUpdatePage.bind(this);
    this.isAdmin = this.isAdmin.bind(this);
    this.isPilot = this.isPilot.bind(this);
  }

  componentWillMount() {
    moment.locale('pt-br');
    const { dispatch, params } = this.props;
    const missionId = params.id;
    dispatch(findMissionById(missionId, dispatch))
    dispatch(findMissionPlannerByMission(missionId, dispatch))
    dispatch(findMissionPassengersByMission(missionId, dispatch))
    dispatch(findMissionPilotsByMission(missionId, dispatch))
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

  goBack() {
    hashHistory.goBack();
  }

  goToUpdatePage() {
    const { id } = this.props.params;
    hashHistory.push('/usuarios/update/'+ id);
  }

  isPilot() {
    const currentUser = this.props.login.currentUser || cookie.load('currentUser');
    return currentUser.perfilAcesso === 'PILOTO';
  }

  isAdmin() {
    const currentUser = this.props.login.currentUser || cookie.load('currentUser');
    return currentUser.perfilAcesso === 'ADMINISTRADOR';
  }

  finishFlight() {
    console.log('finish it')
  }

  render() {
    const { mission, missionPlanner } = this.props.missions;
    const { dispatch } = this.props;
    const missionId = this.props.params.id;
    const buttonStyle = {
      float: "right",
      marginTop: "20px",
    }
    const labelStyle = {
      fontSize: "1.2em",
    }
    const spanStyle = {
      fontSize: "1.7em",
      paddingLeft: "40px"
    }
    const elementContainer = {
      padding: "10px",
    }
    if (!mission || !missionPlanner) {
      return <MissoesLoading />
    }
    const missionStatus = mission.finished ? 'FINALIZADO' : 'EM ABERTO';
    return (
      <Container>
        <h1>Detalhes da missão</h1>
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
          <label style={labelStyle}>Objetivo:</label>
          <span style={spanStyle}>{mission.reason}</span>
        </div>
        <Divider />
        <div style={elementContainer}>
          <label style={labelStyle}>Status:</label><span style={spanStyle}>{missionPlanner ? missionStatus : 'Carregando..'}</span>
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
        <Divider />
        <div style={elementContainer}>
          <label style={labelStyle}>Anexo:</label>
          <a style={spanStyle} href={mission.attachedFile} target="_blank">Arquivo</a>
        </div>
        <div>
          <Button variant="flat" color="primary" style={buttonStyle} disabled={!this.isPilot()} onClick={this.finishFlight.bind(this)}> Finalizar Vôo</Button>
          <Button variant="flat" color="primary" style={buttonStyle} disabled={!this.isAdmin()} onClick={this.goToUpdatePage.bind(this)}>Atualizar</Button>
          <ConfirmActionDialog
                    actionLabel="Remover"
                    style={buttonStyle}
                    action={removeMission}
                    message="Tem certeza que deseja remover a Missão?"
                    itemId={missionId}
                    dispatch={dispatch}
                    shouldGoBack={true}
                    isAdmin={this.isAdmin()}
          />
          <Button variant="flat" color="accent" style={buttonStyle} disabled={!this.isAdmin()} onClick={this.goBack.bind(this)}>Cancelar</Button>
        </div>
      </Container>
    )
  }
}
