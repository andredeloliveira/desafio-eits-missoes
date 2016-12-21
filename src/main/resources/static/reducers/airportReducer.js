/**
  Reflects all the functions declared in the aiportActions
  @see /actions/airportActions.js
  @see <a href="http://redux.js.org/docs/basics/Reducers.html">Redux Reducers</a>
**/

const initialState = {
  fetching: false,
  fetched: false,
  airports: null,
  error: null,
}
export default function airportReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ALL_AIRPORT_PENDING':
      return {
        ...state,
        fetching: true,
      }
    case 'REQUEST_ALL_AIRPORT_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        airports: action.payload,
      }
    case 'REQUEST_ALL_AIRPORT_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload,
      }
    default:
      return state;
  }
}
