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

//In this function our special dispatcher is propagated everywhere, so all the async actions can be performed
export function insertUpdateMission(mission, missionPlanner, dispatch) {
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
      dispatch(insertUpdateMissionDone(missionResponse.data, mission, dispatch))
    })
    .catch((error) => {
      dispatch(insertUpdateMissionError(error))
    })
  } else {
    dispatch(insertUpdateMissionError("Um usuário é necessário para associar à missão"))
  }
  return {
    type: 'REQUEST_INSERT_UPDATE_MISSION_PENDING'
  }
}

export function insertUpdateMissionDone(newMission, mission, dispatch) {
  //with the mission data, we can associate with everything and dispatch other actions as well
  dispatch(insertUpdateMissionPlanner(newMission, mission, dispatch));
  dispatch(insertUpdateMissionPassengers(newMission, mission, dispatch))
  dispatch(insertUpdateMissionPilots(newMission, mission, dispatch))
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

//WE MUST remove everything that is tied to this especific mission. (ALL associative data)
export function removeMission(mission, dispatch) {
  //axios.delete... please remember to add inside then() callback..
  dispatch(removeMissionPlanner(mission))
  dispatch(removeMissionPassengers(mission))
  dispatch(removeMissionPilots(mission))
  dispatch(removeMissionDone(mission))
  return {
    type: 'REQUEST_DELETE_MISSION_PENDING'
  }
}

export function removeMissionPassengers() {
  //axios.delete
  return {
    type: 'REQUEST_DELETE_MISSION_PASSENGERS_PENDING',
  }
}

export function removeMissionPilots() {
  //axios.delete,
  return {
    type: 'REQUEST_DELETE_MISSION_PILOTS_PENDING'
  }
}






/*****************************************************************************************/
// Mission Planner
/*****************************************************************************************/
//TODO(andredeloliveira): add to reducer as well
export function insertUpdateMissionPlanner(newMission, mission, dispatch){
  const missionPlanner = {
    mission: newMission,
    planner: mission.planner
  }
  axios.post('/missoes/missions/planner/insert', missionPlanner)
    .then((missionPlannerResult) => {
      dispatch(insertUpdatemissionPlannerDone(missionPlanner))
    })
    .catch((error) => {
      dispatch(insertUpdateMissionPlannerError(error))
    })
  return {
    type: 'REQUEST_INSERT_UPDATE_MISSION_PLANNER_PENDING',
  }
}

export function insertUpdatemissionPlannerDone(missionPlanner) {
  return {
    type: 'REQUEST_INSERT_UPDATE_MISSION_PLANNER_FULFILLED',
    payload: missionPlanner,
  }
}

export function insertUpdateMissionPlannerError(error) {
  return {
    type: 'REQUEST_INSERT_UPDATE_MISSION_PLANNER_ERROR',
    error: error,
  }
}


//TODO(andredeloliveira): add to reducer as well

/*****************************************************************************************/
// Mission Passengers
/*****************************************************************************************/
export function insertUpdateMissionPassengers(newMission, mission, dispatch){
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
      dispatch(insertupdateMissionPassengersDone())
    }))
    .catch((error) => {
      dispatch(insertUpdateMissionPassengersError(error))
    })

  return {
    type: 'REQUEST_INSERT_UPDATE_MISSION_PASSENGERS_PENDING'
  }
}

export function insertupdateMissionPassengersDone(){
  return {
    type: 'REQUEST_INSERT_UPDATE_MISSION_PASSENGERS_FULFILLED'
  }
}

export function insertUpdateMissionPassengersError(error) {
  return {
    type: 'REQUEST_INSERT_UPDATE_MISSION_PASSENGERS_ERROR',
    error: error,
  }
}

/*****************************************************************************************/
// Mission Pilots
/*****************************************************************************************/

//TODO(andredeloliveira): add to reducer as well
export function insertUpdateMissionPilots(newMission, mission, dispatch){
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
    type: 'REQUEST_INSERT_UPDATE_MISSION_PILOTS_PENDING',
  }
}
 export function insertupdateMissionPilotsDone() {
   return {
     type: 'REQUEST_INSERT_UPDATE_MISSION_PILOTS_FULFILLED',
   }
 }

 export function insertUpdateMissionPilotsError(error) {
   return {
     type: 'REQUEST_INSERT_UPDATE_MISSION_PILOTS_ERROR',
     error: error,
   }
 }
