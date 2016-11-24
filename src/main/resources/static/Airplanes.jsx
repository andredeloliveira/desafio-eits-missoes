import React from 'react';
import { connect } from 'react-redux';
import { CRUDBaseComponent } from './CRUDBaseComponent.jsx';
import { findAllAirplanes } from './actions/airplaneActions';


@connect((Store) => {
  console.log('store value', Store)
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
    return(
      <div>
        <CRUDBaseComponent label="Aeronaves" name="airplane" data={airplanes}/>
      </div>
    )
  }
}
