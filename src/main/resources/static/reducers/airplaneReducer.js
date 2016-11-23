const initialState = {
  fetching: false,
  fetched: false,
  airplanes: null,
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
    default:
      return state;
  }
}
