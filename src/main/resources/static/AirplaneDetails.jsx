import React from 'react';

export class AirplaneDetails extends React.Component {

  constructor(props){
    super(props);

  }

  render() {
    const { airplane } = this.props;
    const labelStyle = {
      fontSize: "1.2em",
    }
    const spanStyle = {
      fontSize: "2.2em",
      paddingLeft: "40px"
    }
    return (
      <div>
        <label style={labelStyle}>Matrícula</label><span style={spanStyle}>{airplane.subscriptionNumber}</span>
        <br />
        <label style={labelStyle}>Número de Assentos</label><span style={spanStyle}>{airplane.seatsNumber}</span>
        <br />
        <label style={labelStyle}>Modelo</label><span style={spanStyle}>{airplane.airplaneModel.manufacturer.name + ' - ' + airplane.airplaneModel.name}</span>
        <br />
        <label style={labelStyle}>Horas de Vôo</label><span style={spanStyle}>{airplane.totalFlightTime || 0}</span>
      </div>
    )
  }
}
