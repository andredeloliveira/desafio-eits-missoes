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
