import axios from 'axios';
import { searchAirplanes } from './searchActions';

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

export function findAirplaneById(id, dispatch) {
  axios.get('/missoes/airplanes/' + id)
    .then((airplaneResponse) => {
      dispatch(findAirplaneByIdDone(airplaneResponse.data))
    })
    .catch((error) => {
      dispatch(findAirplaneByIdError(error))
    })
  return {
    type: 'REQUEST_AIRPLANE_BY_ID_PENDING',
  }
}

export function findAirplaneByIdDone(airplane) {
  return {
    type: 'REQUEST_AIRPLANE_BY_ID_FULFILLED',
    payload: airplane,
  }
}

export function findAirplaneByIdError(error) {
  return {
    type: 'REQUEST_AIRPLANE_BY_ID_ERROR',
    payload: error,
  }
}

export function insertAirplane(airplane, dispatch) {
  axios.post('/missoes/airplanes/insert', airplane)
    .then( (newAirplane) => {
      dispatch(insertAirplaneDone(newAirplane.data))
    })
    .catch( (error) => {
      dispatch(insertUAirplaneError(error))
    })
    return {
      type: 'REQUEST_INSERT_AIRPLANE_PENDING'
    }
}

export function insertAirplaneDone(newAirplane) {
  if (newAirplane.exception) {
    return {
      type: 'REQUEST_INSERT_AIRPLANE_ERROR',
      payload: newAirplane.exception,
    }
  }
  return {
    type: 'REQUEST_INSERT_AIRPLANE_FULFILLED',
    payload: newAirplane
  }
}

export function insertAirplaneError(error) {
  return {
    type: 'REQUEST_INSERT_AIRPLANE_ERROR',
    payload: error
  }
}

export function updateAirplane(airplane, dispatch) {
  axios.post('/missoes/airplanes/insert', airplane)
    .then((updatedAirplane) => {
      dispatch(updateAirplaneDone(updatedAirplane.data))
    })
    .catch((error) => {
      dispatch(updateAirplaneError(error))
    })
  return {
    type: 'REQUEST_UPDATE_AIRPLANE_PENDING',
  }
}

export function updateAirplaneDone(updatedAirplane) {
  return {
    type: 'REQUEST_UPDATE_AIRPLANE_FULFILLED',
    payload: updatedAirplane,
  }
}

export function updateAirplaneError(error) {
  return {
    type: 'REQUEST_UPDATE_AIRPLANE_ERROR',
    payload: error,
  }
}

export function removeAirplane(airplane, dispatch) {
  const airplaneId = airplane.id
  axios.delete('/missoes/airplanes/remove/' + airplaneId)
    .then(() => {
      dispatch(removeAirplaneDone(airplane, dispatch))
    })
    .catch((error) => {
      dispatch(removeAirplaneError(error))
    })
  return {
    type: 'REQUEST_REMOVE_AIRPLANE'
  }
}

export function removeAirplaneDone(removedAirplane, dispatch) {
  dispatch(searchAirplanes('',dispatch))
  return {
    type: 'REQUEST_REMOVE_AIRPLANE_FULFILLED',
    payload: removedAirplane
  }
}

export function removeAirplaneError(error) {
  return {
    type: 'REQUEST_REMOVE_AIRPLANE_ERROR',
    payload: error
  }
}
