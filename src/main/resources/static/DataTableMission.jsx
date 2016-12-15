import React from 'react';
import moment from 'moment'
import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { MissoesLoading } from './MissoesLoading.jsx';
import { CRUDMenu } from './CRUDMenu.jsx';
import { FinishFlightButton } from './FinishFlightButton.jsx';
import { removeMission, findAllMissions } from './actions/missionActions';

@connect((Store) => {
  return {
    missions: Store.missionReducer,
    login: Store.loginReducer,
  }
})
export class DataTableMission extends React.Component {

  constructor(props) {
    super(props);
    this.updateMissions = this.updateMissions.bind(this);
  }

  componentWillMount() {
    moment.locale('pt-br');
  }


  isPiloto() {
    const { currentUser } =  this.props.login ;
    if (currentUser.perfilAcesso === 'PILOTO') {
      return true;
    } else {
      return false;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.missions.newMission !== nextProps.missions.newMission) {
      this.updateMissions()
    }
   }

  updateMissions() {
    console.log('it entered here')
    const { dispatch } = this.props;
    dispatch(findAllMissions(dispatch))
  }

  formattedFetchedData() {
    const { dispatch, name } = this.props;
    return this.props.missions.missions.map((mission) => {
      return (
        <TableRow>
          <TableRowColumn>{moment(mission.mission.dateTime).format('lll')}</TableRowColumn>
          <TableRowColumn>{mission.mission.airplane.subscriptionNumber + ' - ' + mission.mission.airplane.airplaneModel.name}</TableRowColumn>
          <TableRowColumn>{mission.mission.missionTo.acronym + ' - ' + mission.mission.missionTo.name}</TableRowColumn>
          <TableRowColumn>{mission.mission.missionFrom.acronym + ' - ' + mission.mission.missionFrom.name}</TableRowColumn>
          <TableRowColumn>{mission.planner.name}</TableRowColumn>
          <TableRowColumn>
            <CRUDMenu
              data={mission.mission}
              dispatch={dispatch}
              remove={removeMission}
              name={name}
              customButtons={this.isPiloto() ? [<FinishFlightButton
              key={'finishFlightButton'} mission={mission.mission}/>]: []}
            />
          </TableRowColumn>
        </TableRow>
      )
    })
  }

  render() {
    if (!this.props.data.missions) {
      return <MissoesLoading />
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Data/Hora</TableHeaderColumn>
            <TableHeaderColumn>Aeronave</TableHeaderColumn>
            <TableHeaderColumn>Origem</TableHeaderColumn>
            <TableHeaderColumn>Destino</TableHeaderColumn>
            <TableHeaderColumn>Planejado Por</TableHeaderColumn>
            <TableHeaderColumn>Opções</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.formattedFetchedData()}
        </TableBody>
      </Table>
    )
  }
}
