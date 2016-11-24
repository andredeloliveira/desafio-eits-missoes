import React from 'react';
import moment from 'moment'
import { MuiDataTable } from 'mui-data-table';
import { MissoesLoading } from './MissoesLoading.jsx';
import { CRUDMenu } from './CRUDMenu.jsx';
import { FinishFlightButton } from './FinishFlightButton.jsx';

export class DataTableMission extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    moment.locale('pt-br');
  }

  formattedFetchedData() {
    return this.props.data.missions.map((mission) => {
      return {
        id: mission.mission.id,
        dateTime: moment(mission.mission.dateTime).format('lll'),
        airplane: mission.mission.airplane.subscriptionNumber + ' - ' + mission.mission.airplane.model.name,
        missionTo: mission.mission.missionTo.acronym + ' - ' + mission.mission.missionTo.name,
        missionFrom: mission.mission.missionFrom.acronym + ' - ' + mission.mission.missionFrom.name,
        planner: mission.planner.name,
        options: <CRUDMenu data={mission.mission} customButtons={[<FinishFlightButton key={'finishFlightButton'} />]} />,
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
