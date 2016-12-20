import axios from 'axios';

//NOTE all async dispatched actions need a dispatch as param to fulfill the request
export function findAllUsers(dispatch) {

  axios.get('/missoes/users/')
    .then( (usersResponse) => {
      dispatch(allUsers(usersResponse.data))
    })
    .catch( (error) => {
      dispatch(usersError(error))
    })
    return {
      type: 'REQUEST_ALL_USER_PENDING'
    }
}

export function allUsers(usersResult) {
  return {
    type: 'REQUEST_ALL_USER_FULFILLED',
    payload: usersResult
  }
}

export function findUserById(id, dispatch) {
  axios.get('/missoes/users/' + id)
    .then((userResponse) => {
      dispatch(user(userResponse.data))
    })
    .catch((error) => {
      dispatch(usersError)
    })
  return {
    type: 'REQUEST_USER_BY_ID_PENDING',
  }
}

export function user(user) {
  return {
    type: 'REQUEST_USER_BY_ID_FULFILLED',
    payload: user,
  }
}

export function usersError(error) {
  return {
    type: 'REQUEST_ALL_USER_REJECTED',
    error: error
  }
}

export function insertUser(user, dispatch) {
  axios.post('/missoes/users/insert', user)
  .then((newUser) => {
    dispatch(insertUserDone(newUser.data))
  })
  .catch((error) => {
    dispatch(insertUserError(error))
  })
  return {
    type: 'REQUEST_INSERT_USER_PENDING',
  }
}

export function insertUserDone(newUser) {
  if (newUser.exception) {
    return {
      type: 'REQUEST_INSERT_USER_ERROR',
      payload: newUser.exception,
    }
  }
  return {
    type: 'REQUEST_INSERT_USER_FULFILLED',
    payload: newUser,
  }
}

export function insertUserError(error) {
  return {
    type: 'REQUEST_INSERT_USER_ERROR',
    error: error
  }
}

export function updateUser(user, dispatch) {
  axios.post('/missoes/users/insert', user)
    .then((userResponse) => {
      dispatch(updateUserDone(userResponse.data))
    })
    .catch((error) => {
      dispatch(updateUserError(error))
    })
  return {
    type: 'REQUEST_UPDATE_USER_PENDING'
  }
}

export function updateUserDone(user) {
  return {
    type: 'REQUEST_UPDATE_USER_FULFILLED',
    payload: user,
  }
}

export function updateUserError(error) {
  return {
    type: 'REQUEST_UPDATE_USER_ERROR',
    payload: error,
  }
}

export function deactivateActivateUser(user, dispatch) {
  const _id = user.id;
  axios.put('/missoes/users/deactivate/' + _id)
    .then((user) => {
      dispatch(deactivateUserDone(user, dispatch))
    })
    .catch((error) => {
      dispatch(deactivateUserError(error))
    })
  return {
    type: 'REQUEST_DEACTIVATE_USER_PENDING',
  }
}

export function deactivateUserDone(user, dispatch) {
  dispatch(findAllUsers(dispatch))
  return {
    type: 'REQUEST_DEACTIVATE_USER_FULFILLED',
    payload: user
  }
}

export function deact(error) {
  return {
    type: 'REQUEST_DEACTIVATE_USER_ERROR',
    error: error,
  }
}

export function findAllPilots(dispatch) {
  axios.get('/missoes/users/profile/pilots')
    .then((pilotsResponse) => {
      dispatch(allPilots(pilotsResponse.data))
    })
    .catch((error) => {
      dispatch(allPilotsError(error))
    })
  return {
    type: 'REQUEST_ALL_PILOTS_PENDING'
  }
}

export function allPilots(users) {
  return {
    type: 'REQUEST_ALL_PILOTS_FULFILLED',
    payload: users,
  }
}

export function allPilotsError(error) {
  return {
    type: 'REQUEST_ALL_PILOTS_ERROR',
    error: error,
  }
}

export function findAllPassengers(dispatch) {
  axios.get('/missoes/users/profile/passengers')
    .then((passengersResponse) => {
      dispatch(allPassengers(passengersResponse.data))
    })
    .catch((error) => {
      dispatch(allPassengersError(error))
    })
  return {
    type: 'REQUEST_ALL_PASSENGERS_PENDING'
  }
}

export function allPassengers(passengers) {
  return {
    type: 'REQUEST_ALL_PASSENGERS_FULFILLED',
    payload: passengers,
  }
}

export function allPassengersError(error) {
  return {
    type: 'REQUEST_ALL_PASSENGERS_ERROR',
    error: error,
  }
}
