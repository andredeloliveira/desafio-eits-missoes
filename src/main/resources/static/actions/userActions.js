import axios from 'axios';

//NOTE all async dispatched actions need a dispatch as param to fulfill the request
export function findAllUsers(dispatch) {
  axios.get('/missoes/users')
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

export function usersError(error) {
  return {
    type: 'REQUEST_ALL_USER_REJECTED',
    error: error
  }
}

export function insertUpdateUser(user, dispatch) {
  axios.post('/missoes/users/insert', user)
  .then((newUser) => {
    dispatch(insertUpdateUserDone(newUser.data))
  })
  .catch((error) => {
    dispatch(insertUpdateUserError(error))
  })
  return {
    type: 'REQUEST_INSERT_UPDATE_USER_PENDING',
  }
}

export function insertUpdateUserDone(newUser) {
  return {
    type: 'REQUEST_INSERT_UPDATE_USER_FULFILLED',
    payload: newUser,
  }
}

export function insertUpdateUserError(error) {
  return {
    type: 'REQUEST_INSERT_UPDATE_USER_ERROR',
    error: error
  }
}

export function removeUser(user, dispatch) {
  const _id = user.id;
  axios.delete('/missoes/users/remove/' + _id, user.id)
    .then((user) => {
      dispatch(removeUserDone(user))
    })
    .catch((error) => {
      dispatch(removeUserError(error))
    })
  return {
    type: 'REQUEST_REMOVE_USER_PENDING',
  }
}

export function removeUserDone(user) {
  return {
    type: 'REQUEST_REMOVE_USER_FULFILLED',
    payload: user
  }
}

export function removeUserError(error) {
  return {
    type: 'REQUEST_REMOVE_USER_ERROR',
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
