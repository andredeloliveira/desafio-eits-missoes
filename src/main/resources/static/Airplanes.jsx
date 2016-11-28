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
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(findAllAirplanes(dispatch))
  }

  render() {
    const { airplanes } = this.props;
    const { newAirplane } = this.props.airplanes;
    return(
      <div>
        <CRUDBaseComponent label="Aeronaves" name="airplane" data={airplanes}/>
        {newAirplane ?
          <Formfeedback
            message={"Aeronave " + newAirplane.subscriptionNumber + " inserida"}
            duration={3000}
          />
        : null}
      </div>
    )
  }
}
