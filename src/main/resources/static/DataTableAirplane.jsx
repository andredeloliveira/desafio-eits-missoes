import React from 'react';
import { MuiDataTable } from 'mui-data-table';
import { RemoveButton } from './RemoveButton.jsx';
import { MissoesLoading } from './MissoesLoading.jsx';

export class DataTableAirplane extends React.Component {

  constructor(props) {
    super(props);
  }

  //TODO(andredeloliveira): apply an Array.reduce() here so the data can showup
  render() {
    if (!this.props.data.airplanes) {
      return <MissoesLoading />
    }
    const config = {
      paginated: true,
      data: this.props.data.airplanes,
      search: 'subscriptionNumber',
      columns: [
        {
          property: 'subscriptionNumber',
          title: 'Matrícula'
        },
        {
          property: 'model.name',
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
