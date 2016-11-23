import axios from 'axios';

export function findAllAirplanes(dispatch) {
  axios.get('/airplanes')
    .then( (airplanesResponse) => {
      dispatch(allAirplanes(airplanesResponse))
    })
    .catch( (error) => {
      dispatch(airplanesError(error))
    })
  return {
    type: 'REQUEST_ALL_AIRPLANE_PENDING'
  }
}

export function allAirplanes(airplanesResult) {
  return {
    type: 'REQUEST_ALL_AIRPLANE_FULFILLED',
    payload: airplanesResult
  }
}

export function airplanesError(error) {
  return {
    type: 'REQUEST_ALL_AIRPLANE_REJECTED',
    error: error
  }
}
