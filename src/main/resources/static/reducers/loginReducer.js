const initialState = {
  loggedIn: false,
  logging: false,
  currentUser: null
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
        currentUser: null,
        loggedIn: false,
      }
    }
    default:
      return state;
  }
}
