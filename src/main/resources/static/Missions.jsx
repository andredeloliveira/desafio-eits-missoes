import React from 'react';
import { CRUDBaseComponent } from './CRUDBaseComponent.jsx';

export class Missions extends React.Component {

  render() {
    return (
      <div>
        <CRUDBaseComponent label="Missões" name="missions"/>
      </div>
    )
  }
}
