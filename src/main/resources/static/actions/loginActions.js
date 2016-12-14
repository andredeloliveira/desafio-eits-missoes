import axios from 'axios';

export function login(user,  dispatch) {
  axios.post('/missoes/login', user)
    .then((loginResult) => {
      dispatch(activeSession(loginResult.data, dispatch))
    })
    .catch((error) => {
      dispatch(loginError(error))
    })
    return {
      type: 'REQUEST_LOGIN_PENDING'
    }
}

export function activeSession(sessionData, dispatch) {
  if (sessionData.exception) {
    return {
      type: 'REQUEST_LOGIN_ERROR',
      payload: sessionData.exception,
    }
  }
  return {
    type: 'REQUEST_LOGIN_FULFILLED',
    payload: sessionData
  }
}

export function loginError(error) {
  return {
    type: 'REQUEST_LOGIN_ERROR',
    payload: error,
  }
}

export function logout() {
  return {
    type: 'REQUEST_LOGOUT',
  }
}
