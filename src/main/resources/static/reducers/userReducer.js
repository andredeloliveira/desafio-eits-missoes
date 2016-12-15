const initialState = {
  fetching: false,
  fetched: false,
  users: null,
  user: null,
  error: null,
  newUser: null,
  updating: false,
  updatedUser: null,
  pilots: null,
  passengers: null,
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
    case 'REQUEST_USER_BY_ID_PENDING':
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    case 'REQUEST_USER_BY_ID_FULFILLED':
      return {
        ...state,
        fetched: true,
        fetching: false,
        user: action.payload,
      }

    case 'REQUEST_ALL_USER_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    case 'REQUEST_INSERT_USER_PENDING':
      return {
        ...state,
        inserting: true,
        inserted: false
      }
    case 'REQUEST_INSERT_USER_FULFILLED':
      return {
        ...state,
        inserting: false,
        inserted: true,
        newUser: action.payload,
      }
    case 'REQUEST_INSERT_USER_ERROR':
      return {
        ...state,
        error: action.payload,
      }

    case 'REQUEST_UPDATE_USER_PENDING':
      return {
        ...state,
        updating: true
      }
    case 'REQUEST_UPDATE_USER_FULFILLED':
      return {
        ...state,
        updating: false,
        updatedUser: action.payload,
      }
    case 'REQUEST_UPDATE_USER_ERROR':
      return {
        ...state,
        updating: false,
        error: action.payload,
      }
    case 'REQUEST_REMOVE_USER_PENDING':
      return {
        ...state,
        removing: true,
        removed: false,
      }

    case 'REQUEST_REMOVE_USER_FULFILLED':
      return {
        ...state,
        removed: true,
        removing: false,
      }
    case 'REQUEST_REMOVE_USER_ERROR':
      return {
        ...state,
        removed: false,
        removing: false,
        error: action.payload,
      }
    case 'REQUEST_ALL_PILOTS_PENDING':
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    case 'REQUEST_ALL_PILOTS_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        pilots: action.payload,
      }
    case 'REQUEST_ALL_PILOTS_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload,
      }
    case 'REQUEST_ALL_PASSENGERS_PENDING':
      return {
        ...state,
        fetching: true,
      }
    case 'REQUEST_ALL_PASSENGERS_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        passengers: action.payload
      }
    case 'REQUEST_ALL_PASSENGERS_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload,
      }
    case 'SET_INITIAL_STATE':
      return {
        ...state,
        user: null,
        newUser: null,
        updatedUser: null,
      }
    default:
      return state;
  }
}
