/**
  *Dumb* Component for Airplanes. Previously used for properties propagation (props)
  @see <a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.4i7wdljor">Presentational and Container Components</a>
**/
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
