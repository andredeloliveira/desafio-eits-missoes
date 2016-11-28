import React from 'react';
import { connect } from 'react-redux';
import { MuiDataTable } from 'mui-data-table';
import { MissoesLoading } from './MissoesLoading.jsx';
import { CRUDMenu } from './CRUDMenu.jsx';
import { removeAirplane } from './actions/airplaneActions';

@connect((Store) => {
  return {
    airplanes: Store.airplaneReducer
  }
})
export class DataTableAirplane extends React.Component {

  constructor(props) {
    super(props);

    this.formattedFetchedData = this.formattedFetchedData.bind(this);
  }

  formattedFetchedData() {
    const { dispatch } = this.props;
    const { airplanes } = this.props.data;
    const { removedAirplane }  = this.props.airplanes;
    if (removedAirplane) {
      airplanes.splice(removedAirplane, 1);
    }
    return airplanes.map((airplane) => {
      return {
        id: airplane.id,
        totalFlightTime: airplane.totalFlightTime,
        seatsNumber: airplane.seatsNumber,
        totalFlightTime: airplane.totalFlightTime || '0',
        subscriptionNumber: airplane.subscriptionNumber,
        airplaneModel: airplane.airplaneModel.name,
        options: <CRUDMenu
                  data={airplane}
                  customButtons={null}
                  remove={removeAirplane}
                  dispatch={dispatch}/>
      }
    });
  }

  render() {
    if (!this.props.data.airplanes) {
      return <MissoesLoading />
    }
    let data = this.formattedFetchedData()
    let config = {
      paginated: true,
      data: data,
      search: 'subscriptionNumber|totalFlightTime|airplaneModel',
      columns: [
        {
          property: 'subscriptionNumber',
          title: 'Matrícula'
        },
        {
          property: 'airplaneModel',
          title: 'Modelo'
        },
        {
          property: 'totalFlightTime',
          title: 'Horas de Vôo'
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
