/**
  Reflects all the functions declared in the searchActions
  @see /actions/searchActions.js
  @see <a href="http://redux.js.org/docs/basics/Reducers.html">Redux Reducers</a>
**/

const initialState = {
  users: null,
  airplanes: null,
  missions: null,
  fetching: false,
  fetched: false,
  error: null,
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {

    case 'REQUEST_SEARCH_USER_PENDING':
    return {
      ...state,
      fetching: true,
    }

    case 'REQUEST_SEARCH_USER_FULFILLED':
    return {
      ...state,
      fetching: false,
      fetched: true,
      users: action.payload,
    }

    case 'REQUEST_SEARCH_USER_ERROR':
    return {
      ...state,
      fetching: false,
      fetched: false,
      error: action.payload,
    }
    case 'REQUEST_SEARCH_AIRPLANES_PENDING':
    return {
      ...state,
      fetching: true,
      fetched: false,
    }
    case 'REQUEST_SEARCH_AIRPLANES_FULFILLED':
    return {
      ...state,
      fetching: false,
      fetched: true,
      airplanes: action.payload,
    }

    case 'REQUEST_SEARCH_AIRPLANES_ERROR':
    return {
      ...state,
      fetching: false,
      fetched: false,
      error: action.payload,
    }
    case 'REQUEST_SEARCH_MISSIONS_PENDING':
    return {
      ...state,
      fetching: true,
      fetched: false,
    }
    case 'REQUEST_SEARCH_MISSIONS_FULFILLED':
    return {
      fetching: false,
      fetched: true,
      missions: action.payload,
    }
    case 'REQUEST_SEARCH_MISSIONS_ERROR':
    return {
      ...state,
      fetching: false,
      fetched: false,
      error: action.payload,
    }
    default:
    return state;
  }
}
