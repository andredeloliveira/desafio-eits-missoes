import axios from 'axios';

export function login(user,  dispatch) {
  axios.post('/missoes/login', user)
    .then((loginResult) => {
      dispatch(activeSession(loginResult.data))
    })
    .catch((error) => {
      dispatch(loginError(error))
    })
    return {
      type: 'REQUEST_LOGIN_PENDING'
    }
}

export function activeSession(sessionData) {
  sessionStorage.setItem('currentUser', JSON.stringify(sessionData));
  sessionStorage.setItem('loggedIn', true);
  return {
    type: 'REQUEST_LOGIN_FULFILLED',
    payload: sessionData
  }
}

export function loginError(error) {
  return {
    type: 'REQUEST_LOGIN_ERROR',
    error: error
  }
}
