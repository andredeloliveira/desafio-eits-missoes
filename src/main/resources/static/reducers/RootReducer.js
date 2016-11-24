import { combineReducers } from 'redux';
import airplaneReducer from './airplaneReducer';
import userReducer from './userReducer';
import missionReducer from './missionReducer'
//import all other reducers here


const rootReducer = combineReducers({
  airplaneReducer,
  userReducer,
  missionReducer,
});

export default rootReducer;
