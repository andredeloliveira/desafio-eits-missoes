/**
  Reflects all the functions declared in the fileUploadActions
  @see /actions/fileUploadActions.js
  @see <a href="http://redux.js.org/docs/basics/Reducers.html">Redux Reducers</a>
**/

const initialState = {
  uploading: false,
  uploaded: false,
  file: null,
}

export default function fileUploadReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_UPLOAD_FILE_PENDING':
      return {
        ...state,
        uploading: true,
        uploaded: false,
      }
    case 'REQUEST_UPLOAD_FILE_FULFILLED':
      return {
        ...state,
        uploaded: true,
        uploading: false,
        file: action.payload
      }
    case 'REQUEST_UPLOAD_FILE_ERROR':
      return {
        ...state,
        uploading: false,
        uploaded: false,
        error: action.paylod,
      }
    default:
      return state;
  }
}
