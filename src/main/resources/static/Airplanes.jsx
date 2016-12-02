import React from 'react';
import { connect } from 'react-redux';
import { CRUDBaseComponent } from './CRUDBaseComponent.jsx';
import { Formfeedback } from './Formfeedback.jsx';
import { findAllAirplanes } from './actions/airplaneActions';


@connect((Store) => {
  return {
    airplanes: Store.airplaneReducer
  }
})
export class Airplanes extends React.Component {

  constructor(props) {
    super(props);
    this.renderFeedback = this.renderFeedback.bind(this);
  }

  renderFeedback() {
    const { airplanes } = this.props;
    if (airplanes.removed) {
      return (
        <Formfeedback
        message={"Aeronave removida com sucesso"}
        duration={3000}
        />
      )
    } else if (airplanes.newAirplane) {
      return (
        <Formfeedback
          message={"Aeronave " + airplanes.newAirplane.subscriptionNumber + " inserida"}
          duration={3000}
        />
      )
    }
    return null;
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(findAllAirplanes(dispatch))
  }

  render() {
    const { airplanes } = this.props;
    return(
      <div>
        <CRUDBaseComponent label="Aeronaves" name="airplane" data={airplanes}/>
        {this.renderFeedback()}
      </div>
    )
  }
}
