const initialState = {
  fetching: false,
  fetched: false,
  inserting: false,
  inserted: false,
  removing: false,
  removed: false,
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
    case 'REQUEST_INSERT_UPDATE_AIRPLANE_PENDING':
      return {
        ...state,
        inserting: true,
      }
    case 'REQUEST_INSERT_UPDATE_AIRPLANE_FULFILLED':
      return {
        ...state,
        inserting: false,
        inserted: true,
        newAirplane: action.payload
      }
    case 'REQUEST_INSERT_UPDATE_AIRPLANE_ERROR':
      return {
        ...state,
        error: action.payload
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
    default:
      return state;
  }
}
