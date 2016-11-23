'use strict'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { airplaneActions } from './actions/airplaneActions';
import { Airplanes } from '../Airplanes.jsx';
const actions = {
  ...airplaneActions
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Airplanes)
