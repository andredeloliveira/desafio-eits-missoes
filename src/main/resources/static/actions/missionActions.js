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

export function insertUpdateMission(mission, dispatch) {
  console.log('mission at actions', mission)
  axios.post('/missoes/missions/insert', mission)
    .then((missionResponse) => {
      dispatch(insertUpdateMissionDone(missionResponse.data))
    })
    .catch((error) => {
      dispatch(insertUpdateMissionError(error))
    })
  return {
    type: 'REQUEST_INSERT_UPDATE_MISSION_PENDING'
  }
}

export function insertUpdateMissionDone(mission) {
  return {
    type: 'REQUEST_INSERT_UPDATE_MISSION_FULFILLED',
    payload: mission
  }
}

export function insertUpdateMissionError(error) {
  return {
    type: 'REQUEST_INSERT_UPDATE_MISSION_ERROR',
    error: error,
  }
}
