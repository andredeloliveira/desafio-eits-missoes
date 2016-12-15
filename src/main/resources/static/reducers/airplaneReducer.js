const initialState = {
  fetching: false,
  fetched: false,
  inserting: false,
  inserted: false,
  removing: false,
  removed: false,
  updating: false,
  updated: false,
  updatedAirplane: null,
  airplanes: null,
  newAirplane: null,
  removedAirplane: null,
  error: null,
}

//Reducer for airplanes
export default function airplaneReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ALL_AIRPLANE_PENDING':
      return {
        ...state,
        fetching: true,
      }
    case 'REQUEST_ALL_AIRPLANE_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        airplanes: action.payload
      }
    case 'REQUEST_ALL_AIRPLANE_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    case 'REQUEST_AIRPLANE_BY_ID_PENDING':
      return {
        ...state,
        fetching: true,
      }
    case 'REQUEST_AIRPLANE_BY_ID_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        airplane: action.payload,
      }
    case 'REQUEST_AIRPLANE_BY_ID_ERROR':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      }
    case 'REQUEST_INSERT_AIRPLANE_PENDING':
      return {
        ...state,
        inserting: true,
      }
    case 'REQUEST_INSERT_AIRPLANE_FULFILLED':
      return {
        ...state,
        inserting: false,
        inserted: true,
        newAirplane: action.payload
      }
    case 'REQUEST_INSERT_AIRPLANE_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'REQUEST_UPDATE_AIRPLANE_PENDING':
      return {
        ...state,
        updating: true,
        updated: false,
      }
    case 'REQUEST_UPDATE_AIRPLANE_FULFILLED':
      return {
        ...state,
        updating: false,
        updated: true,
        updatedAirplane: action.payload,
      }
    case 'REQUEST_UPDATE_AIRPLANE_ERROR':
      return {
        ...state,
        updating: false,
        error: action.payload,
      }
    case 'REQUEST_REMOVE_AIRPLANE':
      return {
        ...state,
        removing: true,
        removed: false
      }
    case 'REQUEST_REMOVE_AIRPLANE_FULFILLED':
      return {
        ...state,
        removed: true,
        removing: false,
        removedAirplane: action.payload
      }
    case 'REQUEST_REMOVE_AIRPLANE_ERROR':
      return {
        ...state,
        removed: false,
        removing: false,
        error: action.payload
      }
    case 'SET_INITIAL_STATE':
      return {
        ...state,
        newAirplane: null,
        airplane: null,
        updatedAirplane: null,
      }
    default:
      return state;
  }
}
