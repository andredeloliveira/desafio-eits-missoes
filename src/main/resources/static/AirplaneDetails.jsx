import React from 'react';
import { connect } from 'react-redux';
import Container from 'muicss/lib/react/container';
import { MissoesLoading } from './MissoesLoading.jsx';
import { findAirplaneById } from './actions/airplaneActions';

@connect((Store) => {
  return {
    airplanes: Store.airplaneReducer,
  }
})
export class AirplaneDetails extends React.Component {

  constructor(props){
    super(props);
  }

  componentWillMount() {
    const { dispatch, params } = this.props;
    const airplaneId = params.id;
    dispatch(findAirplaneById(airplaneId, dispatch))
  }

  render() {
    const { airplane } = this.props.airplanes;
    const labelStyle = {
      fontSize: "1.2em",
    }
    const spanStyle = {
      fontSize: "1.7em",
      paddingLeft: "40px"
    }
    if (!airplane) {
      return <MissoesLoading />
    }
    return (
      <Container>
        <h1>Detalhes da aeronave</h1>
        <label style={labelStyle}>Matrícula</label><span style={spanStyle}>{airplane.subscriptionNumber}</span>
        <br />
        <label style={labelStyle}>Número de Assentos</label><span style={spanStyle}>{airplane.seatsNumber}</span>
        <br />
        <label style={labelStyle}>Modelo</label><span style={spanStyle}>{airplane.airplaneModel.manufacturer.name + ' - ' + airplane.airplaneModel.name}</span>
        <br />
        <label style={labelStyle}>Horas de Vôo</label><span style={spanStyle}>{airplane.totalFlightTime || 0}</span>
      </Container>
    )
  }
}
