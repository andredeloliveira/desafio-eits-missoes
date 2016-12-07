import React from 'react';
import moment from 'moment'
import { connect } from 'react-redux';
import { MuiDataTable } from 'mui-data-table';
import { MissoesLoading } from './MissoesLoading.jsx';
import { CRUDMenu } from './CRUDMenu.jsx';
import { FinishFlightButton } from './FinishFlightButton.jsx';
import { removeMission } from './actions/missionActions';

@connect((Store) => {
  return {
    missions: Store.missionReducer,
  }
})
export class DataTableMission extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    moment.locale('pt-br');
  }


  isPiloto() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    if (currentUser.perfilAcesso === 'PILOTO') {
      return true;
    } else {
      return false;
    }
  }

  formattedFetchedData() {
    const { dispatch, name } = this.props;
    return this.props.data.missions.map((mission) => {
      return {
        id: mission.mission.id,
        dateTime: moment(mission.mission.dateTime).format('lll'),
        airplane: mission.mission.airplane.subscriptionNumber + ' - ' + mission.mission.airplane.airplaneModel.name,
        missionTo: mission.mission.missionTo.acronym + ' - ' + mission.mission.missionTo.name,
        missionFrom: mission.mission.missionFrom.acronym + ' - ' + mission.mission.missionFrom.name,
        planner: mission.planner.name,
        options: <CRUDMenu
                  data={mission.mission}
                  dispatch={dispatch}
                  remove={removeMission}
                  name={name}
                  customButtons={this.isPiloto() ? [<FinishFlightButton
                  key={'finishFlightButton'} mission={mission.mission}/>]: []} />,
      }
    })
  }

  render() {
    if (!this.props.data.missions) {
      return <MissoesLoading />
    }
    const config = {
      paginated: true,
      data: this.formattedFetchedData(),
      search: 'planner|missionTo|missionFrom|dateTime',
      columns: [
        {
          property: 'dateTime',
          title: 'Data/Hora'
        },
        {
          property: 'airplane',
          title: 'Aeronave'
        },
        {
          property: 'missionFrom',
          title: 'Origem'
        },
        {
          property: 'missionTo',
          title: 'Destino'
        },
        {
          property: 'planner',
          title: 'Planejado Por'
        },
        {
          property: 'options',
          title: 'Opções'
        }
      ]
    }
    return (
      <div>
        <MuiDataTable config={config} />
      </div>
    )
  }
}
