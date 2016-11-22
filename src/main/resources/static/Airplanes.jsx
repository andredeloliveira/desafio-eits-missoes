import React from 'react';
import { CRUDBaseComponent } from './CRUDBaseComponent.jsx';
export class Airplanes extends React.Component {

  render() {
    return(
      <div>
        <CRUDBaseComponent label="Aeronaves" name="airplane"/>
      </div>
    )
  }
}
