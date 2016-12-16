import React from 'react';
import { connect } from 'react-redux';
import Input from 'muicss/lib/react/input';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
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
    const { dispatch, name } = this.props;
    const { airplanes } = this.props.data;
    return airplanes.map((airplane) => {
      return (
        <TableRow key={airplane.id}>
          <TableRowColumn>{airplane.subscriptionNumber}</TableRowColumn>
          <TableRowColumn>{airplane.airplaneModel.name}</TableRowColumn>
          <TableRowColumn>{airplane.totalFlightTime || '0'}</TableRowColumn>
          <TableRowColumn>{airplane.seatsNumber}</TableRowColumn>
          <TableRowColumn>
            <CRUDMenu
              data={airplane}
              customButtons={null}
              remove={removeAirplane}
              dispatch={dispatch}
              name={name}
              />
          </TableRowColumn>
        </TableRow>
      )
    });
  }

  searchAirplane(event) {
    console.log(event.target.value)
  }

  render() {
    if (!this.props.data.airplanes) {
      return <MissoesLoading />
    }
    return (
      <div>
        <Input type="text" label="Buscar" onChange={this.searchAirplane.bind(this)} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Matrícula</TableHeaderColumn>
              <TableHeaderColumn>Modelo</TableHeaderColumn>
              <TableHeaderColumn>Horas de vôo</TableHeaderColumn>
              <TableHeaderColumn>Número Assentos</TableHeaderColumn>
              <TableHeaderColumn>Opções</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.formattedFetchedData()}
          </TableBody>
        </Table>
      </div>
    )
  }

}
