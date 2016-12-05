import React from 'react';

export class AirplaneDetails extends React.Component {

  constructor(props){
    super(props);

  }

  render() {
    const { airplane } = this.props;
    return (
      <div>
        <span>{airplane.subscriptionNumber}</span>
        <br />
        <span>{airplane.seatsNumber}</span>
        <br />
        <span>{airplane.airplaneModel.name}</span>
      </div>
    )
  }
}
