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
    this.renderFeedback = this.renderFeedback.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(findAllMissions(dispatch))
  }

  renderFeedback() {
    const { newMission, error, removed } = this.props.missions;
    if (newMission) {
      return (
        <Formfeedback
          message={"Missão agendada com sucesso!" }
          duration={3000}
        />
      )
    }
  }

  render() {
    const { missions } = this.props;

    return (
      <div>
        <CRUDBaseComponent label="Missões" name="mission" data={missions}/>
        { this.renderFeedback() }
      </div>
    )
  }
}
