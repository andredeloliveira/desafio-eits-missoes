import React from 'react';
import { MuiDataTable } from 'mui-data-table';
import { RemoveButton } from './RemoveButton.jsx';
import { MissoesLoading } from './MissoesLoading.jsx';

export class DataTableAirplane extends React.Component {

  constructor(props) {
    super(props);
  }

  formattedFetchedData() {
    return this.props.data.airplanes.map((airplane) => {
      return {
        id: airplane.id,
        totalFlightTime: airplane.totalFlightTime,
        seatsNumber: airplane.seatsNumber,
        totalFlightTime: airplane.totalFlightTime,
        subscriptionNumber: airplane.subscriptionNumber,
        airplaneModel: airplane.model.name,
      }
    });
  }

  //TODO(andredeloliveira): apply an Array.reduce() here so the data can showup
  render() {
    if (!this.props.data.airplanes) {
      return <MissoesLoading />
    }
    const config = {
      paginated: true,
      data: this.formattedFetchedData(),
      search: 'subscriptionNumber',
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
      ]
    }
    return (
      <div>
        <MuiDataTable config={config} />
      </div>
    )
  }

}
