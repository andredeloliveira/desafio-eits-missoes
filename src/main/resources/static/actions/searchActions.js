/**
All the actions that are related to the Search Services are being declared here.
@see <a href="http://redux.js.org/docs/basics/Actions.html">Redux Actions</a>
**/
import axios from 'axios';

export function searchUser(query, dispatch) {
  axios.get('/missoes/users/search?query='+ query)
    .then((searchUserResponse) => {
      dispatch(searchUserDone(searchUserResponse.data))
    })
    .catch((error) => {
      dispatch(searchUserError(error))
    })
  return {
    type: 'REQUEST_SEARCH_USER_PENDING',
  }
}

export function searchUserDone(user) {
  return {
    type: 'REQUEST_SEARCH_USER_FULFILLED',
    payload: user,
  }
}

export function searchUserError(error) {
  return {
    type: 'REQUEST_SEARCH_USER_ERROR',
    payload: error,
  }
}


export function searchAirplanes(query, dispatch) {
  axios.get('/missoes/airplanes/search?query=' + query)
    .then((searchAirplanesResponse) => {
      dispatch(searchAirplanesDone(searchAirplanesResponse.data))
    })
    .catch((error) => {
      dispatch(searchAirplanesError(error))
    })
  return {
    type: 'REQUEST_SEARCH_AIRPLANES_PENDING',
  }
}

export function searchAirplanesDone(airplanes) {
  return {
    type: 'REQUEST_SEARCH_AIRPLANES_FULFILLED',
    payload: airplanes,
  }
}

export function searchAirplanesError(error) {
  return {
    type: 'REQUEST_SEARCH_AIRPLANES_ERROR',
    payload: error
  }
}

export function searchMissions(query, dispatch) {
  axios.get('/missoes/missions/search?query=' + query)
    .then((searchMissionsResponse) => {
      dispatch(searchMissionsDone(searchMissionsResponse.data))
    })
    .catch((error) => {
      dispatch(searchMissionsError(error))
    })
  return {
      type: 'REQUEST_SEARCH_MISSIONS_PENDING',
  }
}

export function searchMissionsDone(missions) {
  return {
    type: 'REQUEST_SEARCH_MISSIONS_FULFILLED',
    payload: missions,
  }
}

export function searchMissionsError(error) {
  return {
    type: 'REQUEST_SEARCH_MISSIONS_ERROR',
    payload: error,
  }
}
