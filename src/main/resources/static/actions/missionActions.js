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
    payload: error
  }
}

export function findMissionById(missionId, dispatch) {
  axios.get('/missoes/missions/' + missionId)
    .then((missionResponse) => {
      dispatch(findMissionByIdDone(missionResponse.data))
    })
    .catch((error) => {
      dispatch(findMissionByIdError(error))
    })
  return {
    type: 'REQUEST_MISSION_BY_ID_PENDING',
  }
}

export function findMissionByIdDone(mission) {
  return {
    type: 'REQUEST_MISSION_BY_ID_FULFILLED',
    payload: mission,
  }
}

export function findMissionByIdError(error) {
  return {
    type: 'REQUEST_MISSION_BY_ID_ERROR',
    payload: error,
  }
}


//In this function our special dispatcher is propagated everywhere, so all the async actions can be performed
export function insertMission(mission, missionPlanner, dispatch) {
  if (missionPlanner){
    /*
    * We have splitted the mission data into
    * mission: {
        mission: Object (Mission) -> Java Reference for it > (See Mission.java)
        planner: Object (User) -> Java Reference for it > (See User.java)
        passengers: [User]
        pilots: [User]
      }
    */
    axios.post('/missoes/missions/insert', mission.mission)
    .then((missionResponse) => {
      dispatch(insertMissionDone(missionResponse.data, mission, dispatch))
    })
    .catch((error) => {
      dispatch(insertMissionError(error))
    })
  } else {
    dispatch(insertMissionError("Um usuário é necessário para associar à missão"))
  }
  return {
    type: 'REQUEST_INSERT_MISSION_PENDING'
  }
}

export function insertMissionDone(newMission, mission, dispatch) {
  //with the mission data, we can associate with everything and dispatch other actions as well
  dispatch(insertMissionPlanner(newMission, mission, dispatch));
  dispatch(insertMissionPassengers(newMission, mission, dispatch))
  dispatch(insertMissionPilots(newMission, mission, dispatch))
  return {
    type: 'REQUEST_INSERT_MISSION_FULFILLED',
    payload: mission
  }
}

export function insertMissionError(error) {

  return {
    type: 'REQUEST_INSERT_UPDATE_MISSION_ERROR',
    payload: error,
  }
}

//WE MUST remove everything that is tied to this especific mission. (ALL associative data removed in the back-end)
export function removeMission(mission, dispatch) {
  //axios.delete... please remember to add inside then() callback..
  axios.post('/missoes/missions/remove/', mission)
    .then(() => {
      dispatch(removeMissionDone(dispatch))
    })
    .catch((error) => {
      dispatch(removeMissionError(error))
    })
  return {
    type: 'REQUEST_DELETE_MISSION_PENDING'
  }
}

export function updateMission(mission, missionPlanner, dispatch) {
  if (missionPlanner){
    axios.post('/missoes/missions/insert', mission.mission)
    .then((missionResponse) => {
      dispatch(updateMissionDone(missionResponse.data, mission, dispatch))
    })
    .catch((error) => {
      dispatch(updateMissionError(error))
    })
  } else {
    dispatch(updateMissionError("Um usuário é necessário para associar à missão"))
  }
  return {
    type: 'REQUEST_UPDATE_MISSION_PENDING'
  }
}

export function updateMissionDone(updatedMission, mission, dispatch) {
  dispatch(insertMissionPlanner(updatedMission, mission, dispatch));
  dispatch(insertMissionPassengers(updatedMission, mission, dispatch))
  dispatch(insertMissionPilots(updatedMission, mission, dispatch))
  return {
    type: 'REQUEST_UPDATE_MISSION_FULFILLED',
    payload: mission
  }
}

export function updateMissionError(error) {
  return {
    type: 'REQUEST_UPDATE_MISSION_ERROR',
    payload: error,
  }
}

export function removeMissionDone(dispatch) {
  dispatch(findAllMissions(dispatch))
  return {
    type: 'REQUEST_DELETE_MISSION_FULFILLED'
  }
}

export function removeMissionError(error) {
  return {
    type: 'REQUEST_DELETE_AIRPLANE_ERROR',
    payload: error,
  }
}


/*****************************************************************************************/
// Mission Planner
/*****************************************************************************************/

export function insertMissionPlanner(newMission, mission, dispatch){
  const missionPlanner = {
    mission: newMission,
    planner: mission.planner
  }
  axios.post('/missoes/missions/planner/insert', missionPlanner)
    .then((missionPlannerResult) => {
      dispatch(insertMissionPlannerDone(missionPlanner))
    })
    .catch((error) => {
      dispatch(insertMissionPlannerError(error))
    })
  return {
    type: 'REQUEST_INSERT_MISSION_PLANNER_PENDING',
  }
}

export function insertMissionPlannerDone(missionPlanner) {
  return {
    type: 'REQUEST_INSERT_MISSION_PLANNER_FULFILLED',
    payload: missionPlanner,
  }
}

export function insertUpdateMissionPlannerError(error) {
  return {
    type: 'REQUEST_INSERT_MISSION_PLANNER_ERROR',
    payload: error,
  }
}

export function removeMissionPlanner(mission, dispatch) {
  const missionPlannerId  = mission.planner.id
  axios.delete('/missions/missionPlanner/remove/' + missionPlannerId, missionPlannerId)
    .then(() => {
      dispatch(removeMissionPlannerDone())
    })
    .catch((error) => {
      dispatch(removeMissionPlannerError(error))
    })
  return {
    type: 'REQUEST_DELETE_MISSION_PLANNER_PENDING',
  }
}

export function removeMissionPlannerDone() {
  return {
    type: 'REQUEST_REMOVE_MISSION_PLANNER_FULFILLED',
  }
}

export function removeMissionPlannerError(error) {
  return {
    type: 'REQUEST_DELETE_MISSION_PLANNER_ERROR',
    payload: error,
  }
}

export function findMissionPlannerByMission(mission, dispatch) {
   axios.post('/missoes/missions/missionPlannerByMission', mission)
    .then((missionPlannerResponse) => {
      dispatch(missionPlannerByMission(missionPlannerResponse.data))
    })
    .catch((error) => {
      dispatch(findMissionPlannerByMissionError(error))
    })
  return {
    type: 'REQUEST_MISSION_PLANNER_BY_MISSION_PENDING',
  }
}

export function missionPlannerByMission(missionPlanner) {
  return {
    type: 'REQUEST_MISSION_PLANNER_BY_MISSION_FULFILLED',
    payload: missionPlanner,
  }
}

export function findMissionPlannerByMissionError(error) {
  return {
    type: 'REQUEST_MISSION_PLANNER_BY_MISSION_ERROR',
    payload: error,
  }
}


/*****************************************************************************************/
// Mission Passengers
/*****************************************************************************************/
export function insertMissionPassengers(newMission, mission, dispatch){
  //send multiple requests to grant consistent async concurrency (as Promises)
  const allinsertPassengersRequest = mission.passengers.map((passenger) => {
    const missionPassenger = {
      mission: newMission,
      passenger: passenger,
    }
    return axios.post('/missoes/missions/passenger/insert', missionPassenger)
  })
  axios.all(allinsertPassengersRequest)
    .then(axios.spread((spreadResult) => {
      dispatch(insertMissionPassengersDone())
    }))
    .catch((error) => {
      dispatch(insertMissionPassengersError(error))
    })

  return {
    type: 'REQUEST_INSERT_MISSION_PASSENGERS_PENDING'
  }
}

export function insertMissionPassengersDone(){
  return {
    type: 'REQUEST_INSERT_MISSION_PASSENGERS_FULFILLED'
  }
}

export function insertMissionPassengersError(error) {
  return {
    type: 'REQUEST_INSERT_MISSION_PASSENGERS_ERROR',
    payload: error,
  }
}

export function updateMissionPassengers() {
  //axios.post
  return {

  }
}


export function removeMissionPassengers(mission, dispatch) {
  return {
    type: 'REQUEST_DELETE_MISSION_PASSENGERS_PENDING',
  }
}

export function removeMissionPassengersDone() {
  return {
    type: 'REQUEST_DELETE_MISSION_PASSENGERS_FULFILLED',
  }
}

export function removeMissionPassengersError(error) {
  return {
    type: 'REQUEST_DELETE_MISSION_PASSENGERS_ERROR',
    payload: error,
  }
}

export function findMissionPassengersByMission(missionId, dispatch) {
  axios.get('/missoes/missions/missionPassengersByMission/' + missionId)
    .then((missionPassengersResponse) => {
      dispatch(missionPassengers(missionPassengersResponse.data))
    })
    .catch((error) => {
      dispatch(findMissionPassengersByMissionError(error))
    })
  return {
    type: 'REQUEST_MISSION_PASSENGERS_BY_MISSION_PENDING',
  }
}

export function missionPassengers(missionPassengers) {
  return {
    type: 'REQUEST_MISSION_PASSENGERS_BY_MISSION_FULFILLED',
    payload: missionPassengers,
  }
}

export function findMissionPassengersByMissionError(error) {
  return {
    type: 'REQUEST_MISSION_PASSENGERS_BY_MISSION_ERROR',
    payload: error,
  }
}

/*****************************************************************************************/
// Mission Pilots
/*****************************************************************************************/

//TODO(andredeloliveira): add to reducer as well
export function insertMissionPilots(newMission, mission, dispatch){
  const allinsertPilotsRequest = mission.pilots.map((pilot) => {
    const missionPilot = {
      mission: newMission,
      pilot: pilot
    }
    return axios.post('/missoes/missions/pilot/insert', missionPilot);
    axios.all(allinsertPilotsRequest)
      .then(axios.spread((spreadResult) => {
        dispatch(insertupdateMissionPilotsDone())
      }))
      .catch((error) => {
        dispatch(insertUpdateMissionPilotsError(error))
      })
  })

  return {
    type: 'REQUEST_INSERT_MISSION_PILOTS_PENDING',
  }
}
 export function insertMissionPilotsDone() {
   return {
     type: 'REQUEST_INSERT_MISSION_PILOTS_FULFILLED',
   }
 }

export function insertMissionPilotsError(error) {
 return {
   type: 'REQUEST_INSERT_MISSION_PILOTS_ERROR',
   payload: error,
 }
}

export function removeMissionPilots(mission) {
 return {
   type: 'REQUEST_DELETE_MISSION_PILOTS_PENDING'
 }
}

export function findMissionPilotsByMission(missionId, dispatch) {
  axios.get('/missoes/missions/missionPilotsByMission/' + missionId)
    .then((missionPilotsResponse) => {
      dispatch(missionPilotsByMission(missionPilotsResponse.data))
    })
    .catch((error) => {
      dispatch(findMissionPilotsByMissionError(error))
    })
  return {
    type: 'REQUEST_MISSION_PILOTS_BY_MISSION_PENDING',
  }
}

export function missionPilotsByMission(missionPilots) {
  return {
    type: 'REQUEST_MISSION_PILOTS_BY_MISSION_FULFILLED',
    payload: missionPilots,
  }
}

export function findMissionPilotsByMissionError(error) {
  return {
    type: 'REQUEST_MISSION_PILOTS_BY_MISSION_ERROR',
    payload: error,
  }
}
/*****************************************************************************************/
// Finish Mission
/*****************************************************************************************/

export function finishFlight(mission, dispatch) {
  axios.post('/missoes/missions/finishFlight', mission)
    .then((finishFlightResult) => {
      dispatch(finishFlightDone(finishFlightResult))
    })
    .catch((error) => {
      dispatch(finishFlightError(error))
    })
  return {
    type: 'REQUEST_FINISH_FLIGHT_PENDING',
  }
}

export function finishFlightDone(finishFlightResult) {
  return {
    type: 'REQUEST_FINISH_FLIGHT_FULFILLED',
    payload: finishFlightResult,
  }
}

export function finishFlightError(error) {
  return {
    type: 'REQUEST_FINISH_FLIGHT_ERROR',
    payload: error,
  }
}
