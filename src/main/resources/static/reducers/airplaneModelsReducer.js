const initialState = {
  fetching: false,
  fetched: false,
  airplaneModels: null,
  error: null
}

export default function airplaneReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ALL_AIRPLANEMODELS_PENDING':
      return {
        ...state,
        fetching: true,
      }
    case 'REQUEST_ALL_AIRPLANEMODELS_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        airplaneModels: action.payload,
      }
    case 'REQUEST_ALL_AIRPLANEMODELS_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    default:
      return state;
  }
}
