const initialState = {
  fetching: false,
  fetched: false,
  missions: null,
  error: null,
}

export default function missionReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ALL_MISSION_PENDING':
      return {
        ...state,
        fetching: true,
      }
    case 'REQUEST_ALL_MISSION_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        missions: action.payload,
      }
    case 'REQUEST_ALL_MISSION_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
