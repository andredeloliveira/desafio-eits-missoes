import axios from 'axios';

export function uploadFile(file, dispatch) {
  axios.post('/missoes/missions/uploadFile', file)
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
