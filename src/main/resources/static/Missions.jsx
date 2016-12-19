import React from 'react';
import { connect } from 'react-redux';
import { findAllMissions } from './actions/missionActions';
import { CRUDBaseComponent } from './CRUDBaseComponent.jsx';
import { Formfeedback } from './Formfeedback.jsx';


export class Missions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { missions } = this.props;
    return (
      <div>
        <CRUDBaseComponent label="Missões" name="missoes" data={missions}/>
      </div>
    )
  }
}
