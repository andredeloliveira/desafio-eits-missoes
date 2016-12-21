/*
  Renders the Datatable and actions that are related to the Mission class
  @see Mission (Java)
*/

import React from 'react';
import moment from 'moment'
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import Input from 'muicss/lib/react/input';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { MissoesLoading } from './MissoesLoading.jsx';
import { Formfeedback } from './Formfeedback.jsx';
import { CRUDMenu } from './CRUDMenu.jsx';
import { FinishFlightButton } from './FinishFlightButton.jsx';
import { removeMission, findAllMissions } from './actions/missionActions';
import { searchMissions } from './actions/searchActions'

@connect((Store) => {
  return {
    missions: Store.missionReducer,
    login: Store.loginReducer,
    search: Store.searchReducer
  }
})
export class DataTableMission extends React.Component {

  constructor(props) {
    super(props);
    this.updateMissions = this.updateMissions.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    moment.locale('pt-br');
    dispatch(searchMissions('', dispatch))
  }


  isPiloto() {
    const currentUser =  this.props.login.currentUser || cookie.load('currentUser') ;
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
  }

  formattedFetchedData() {
    const { dispatch, name } = this.props;
    const { missions } = this.props.search;
    return missions.map((mission) => {
      return (
        <TableRow key={mission.id}>
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

  searchMission(event) {
    const query = event.target.value;
    const { dispatch } = this.props;
    dispatch(searchMissions(query, dispatch))
  }

  render() {
    const { missions } = this.props.search;
    const { updatedMission } = this.props.missions;
    if (!missions) {
      return <MissoesLoading />
    }

    return (
      <div>
        <Input type="text" label="Buscar" onChange={this.searchMission.bind(this)} />
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
        {updatedMission ?
          <Formfeedback
            message={"Missão finalizada com sucesso"}
            duration={3000}
          />: null}
      </div>
    )
  }
}
