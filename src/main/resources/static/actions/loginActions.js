/**
All the actions that are related to the authentication services are being declared here.
@see <a href="http://redux.js.org/docs/basics/Actions.html">Redux Actions</a>
**/
import axios from 'axios';
import cookie from 'react-cookie';
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
  cookie.save('currentUser', sessionData, { path: '/'})
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
  cookie.remove('currentUser', { path: '/' })
  return {
    type: 'REQUEST_LOGOUT',
  }
}
