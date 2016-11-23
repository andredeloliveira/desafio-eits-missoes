import React from 'react';
import { CRUDBaseComponent } from './CRUDBaseComponent.jsx';
import { findAllAirplanes } from './actions/airplaneActions';

export class Airplanes extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //
  }

  render() {
    const { airplanes } = this.props;
    return(
      <div>
        <CRUDBaseComponent label="Aeronaves" name="airplane"/>
      </div>
    )
  }
}
