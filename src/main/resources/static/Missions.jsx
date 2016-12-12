import React from 'react';
import { connect } from 'react-redux';
import { findAllMissions } from './actions/missionActions';
import { CRUDBaseComponent } from './CRUDBaseComponent.jsx';
import { Formfeedback } from './Formfeedback.jsx';

@connect((Store) => {
  return {
    missions: Store.missionReducer
  }
})
export class Missions extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(findAllMissions(dispatch))
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
