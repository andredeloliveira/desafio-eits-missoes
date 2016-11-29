const initialState = {
  fetching: false,
  fetched: false,
  users: null,
  error: null,
  newUser: null,
}

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'REQUEST_ALL_USER_PENDING':
      return {
        ...state,
        fetching: true
      }
    case 'REQUEST_ALL_USER_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      }
    case 'REQUEST_ALL_USER_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    case 'REQUEST_INSERT_UPDATE_USER_PENDING':
      return {
        ...state,
        inserting: true,
        inserted: false
      }
    case 'REQUEST_INSERT_UPDATE_USER_FULFILLED':
      return {
        ...state,
        inserting: false,
        inserted: true,
        newUser: action.payload,
      }
    case 'REQUEST_INSERT_UPDATE_USER_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
}
