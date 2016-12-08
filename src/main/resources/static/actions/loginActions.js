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
  sessionStorage.setItem('currentUser', JSON.stringify(sessionData));
  sessionStorage.setItem('loggedIn', true);
  if (sessionData === "") {
    return {
      type: 'REQUEST_LOGIN_ERROR',
      payload: 'E-mail e/ou senha inválidos'
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
    payload: error
  }
}

export function logout() {
  return {
    type: 'REQUEST_LOGOUT',
  }
}
