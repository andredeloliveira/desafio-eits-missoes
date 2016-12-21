/**
All the actions that are related to the Airport Entity are being declared here.
@see Airport (Java)
@see <a href="http://redux.js.org/docs/basics/Actions.html">Redux Actions</a>
**/

import axios from 'axios';

export function findAllAirports(dispatch) {
  axios.get('/missoes/airports')
    .then((airportsResult) => {
      dispatch(allAirports(airportsResult.data))
    })
    .catch((error) => {
      dispatch(airportsError(error))
    })
  return {
    type: 'REQUEST_ALL_AIRPORT_PENDING'
  }
}

export function allAirports(airports) {
  return {
    type: 'REQUEST_ALL_AIRPORT_FULFILLED',
    payload: airports
  }
}

export function airportsError(error) {
  return {
    type: 'REQUEST_ALL_AIRPORT_ERROR',
    error: error
  }
}
