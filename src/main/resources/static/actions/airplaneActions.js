import axios from 'axios';

export function findAllAirplanes(dispatch) {
  axios.get('/missoes/airplanes')
    .then( (airplanesResponse) => {
      dispatch(allAirplanes(airplanesResponse.data))
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

export function insertUpdateAirplane(airplane, dispatch) { 
  console.log('airplane data', airplane)
  axios.post('/missoes/airplanes/insert', airplane)
    .then( (newAirplane) => {
      dispatch(inserteUpdateAirplaneDone(newAirplane.data))
    })
    .catch( (error) => {
      dispatch(insertUpdateAirplaneError(error))
    })
    return {
      type: 'REQUEST_INSERT_UPDATE_AIRPLANE_PENDING'
    }
}

export function inserteUpdateAirplaneDone(newAirplane) {
  return {
    type: 'REQUEST_INSERT_UPDATE_AIRPLANE_FULFILLED',
    payload: newAirplane
  }
}

export function insertUpdateAirplaneError(error) {
  return {
    type: 'REQUEST_INSERT_UPDATE_AIRPLANE_ERROR',
    error: error
  }
}
