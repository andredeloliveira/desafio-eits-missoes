const initialState = {
  fetching: false,
  fetched: false,
  users: null,
  error: null
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
    default:
      return state;
  }
}
