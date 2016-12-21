/**
All the actions that are related to the AirplaneModel Entity are being declared here.
@see AirplaneModel (Java)
@see <a href="http://redux.js.org/docs/basics/Actions.html">Redux Actions</a>
**/
import axios from 'axios';

export function findAllAirplaneModels(dispatch) {
  axios.get('/missoes/airplaneModels')
    .then( (airplaneModelsResult) => {
      dispatch(allAirplaneModels(airplaneModelsResult.data))
    })
    .catch( (error) => {
      dispatch(airplaneModelsError(error))
    })
  return {
    type: 'REQUEST_ALL_AIRPLANEMODELS_PENDING'
  }
}

export function allAirplaneModels(airplaneModelsResult) {
  return {
    type: 'REQUEST_ALL_AIRPLANEMODELS_FULFILLED',
    payload: airplaneModelsResult
  }
}

export function airplaneModelsError(error) {
  return {
    type: 'REQUEST_ALL_AIRPLANEMODELS_REJECTED',
    payload: error
  }
}
