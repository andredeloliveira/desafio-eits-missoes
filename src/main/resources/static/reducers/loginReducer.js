/**
  Reflects all the functions declared in the loginActions
  @see /actions/loginActions.js
  @see <a href="http://redux.js.org/docs/basics/Reducers.html">Redux Reducers</a>
**/

const initialState = {
  loggedIn: false,
  logging: false,
  currentUser: null,
}

export default function loginReducer(state = initialState, action){
  switch (action.type) {
    case 'REQUEST_LOGIN_PENDING':
      return {
        ...state,
        logging: true,
      }
    case 'REQUEST_LOGIN_FULFILLED':
      return {
        ...state,
        logging: false,
        loggedIn: true,
        currentUser: action.payload
      }
    case 'REQUEST_LOGIN_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'REQUEST_LOGOUT': {
      return {
        ...state,
        error: null,
        currentUser: null,
        loggedIn: false,
      }
    }
    case 'REQUEST_CURRENT_USER_PENDING': {
      return {
        ...state,
        logging: true,
      }
    }
    case 'REQUEST_CURRENT_USER_FULFILLED': {
      return {
        ...state,
        currentUser: action.payload,
        loggedIn: true,
      }
    }
    case 'REQUEST_CURRENT_USER_ERROR': {
      return {
        ...state,
        loggedIn: false,
        logging: false,
      }
    }
    default:
      return state;
  }
}
