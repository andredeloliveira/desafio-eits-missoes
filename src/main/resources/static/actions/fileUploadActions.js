/**
All the actions that are related to file uploading are being declared here.
@see <a href="http://redux.js.org/docs/basics/Actions.html">Redux Actions</a>
**/
import axios from 'axios';

export function uploadFile(file, dispatch) {
  let formData = new FormData();
  formData.append('file', file);
  axios.post('/missoes/uploadFile', formData)
    .then((fileResponse) => {
      dispatch(uploadFileDone(fileResponse.data))
    })
    .catch((error) => {
      dispatch(uploadFileError(error))
    })
  return {
    type: 'REQUEST_UPLOAD_FILE_PENDING',
  }
}

export function uploadFileDone(file) {
  return {
    type: 'REQUEST_UPLOAD_FILE_FULFILLED',
    payload: file,
  }
}

export function uploadFileError(error) {
  return {
    type: 'REQUEST_UPLOAD_FILE_ERROR',
    payload: error,
  }
}
