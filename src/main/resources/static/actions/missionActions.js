import axios from 'axios';

export function findAllMissions(dispatch){
  axios.get('/missoes/missions')
    .then( (missionsResult) => {
      dispatch(allMissions(missionsResult.data))
    })
    .catch( (error) => {
      dispatch(missionsError(error))
    })
    return {
      type: 'REQUEST_ALL_MISSION_PENDING'
    }
}

export function allMissions(missionsResult) {
  return {
    type: 'REQUEST_ALL_MISSION_FULFILLED',
    payload: missionsResult
  }
}

export function missionsError(error) {
  return {
    type: 'REQUEST_ALL_MISSION_REJECTED',
    error: error
  }
}
