import React from 'react';
import { connect } from 'react-redux';
import { CRUDBaseComponent } from './CRUDBaseComponent.jsx';
import { Formfeedback } from './Formfeedback.jsx';
import { findAllAirplanes } from './actions/airplaneActions';



export class Airplanes extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { airplanes } = this.props;
    return(
      <div>
        <CRUDBaseComponent label="Aeronaves" name="aeronaves" data={airplanes}/>
      </div>
    )
  }
}
