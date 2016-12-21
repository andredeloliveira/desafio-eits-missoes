/**
  The RootReducer combine all the reducers in a single Store as the Redux architecture describes.
  @see <a href="http://redux.js.org/docs/api/combineReducers.html">Redux</a>
  @see <a href="http://redux.js.org/docs/basics/Reducers.html">Redux Reducers</a>
**/

import { combineReducers } from 'redux';
import airplaneReducer from './airplaneReducer';
import airplaneModelsReducer from './airplaneModelsReducer';
import userReducer from './userReducer';
import missionReducer from './missionReducer';
import loginReducer from './loginReducer';
import airportReducer from './airportReducer';
import fileUploadReducer from './fileUploadReducer';
import searchReducer from './searchReducer';
//import all other reducers here


const rootReducer = combineReducers({
  airplaneReducer,
  airplaneModelsReducer,
  userReducer,
  missionReducer,
  loginReducer,
  airportReducer,
  fileUploadReducer,
  searchReducer,
});

export default rootReducer;
