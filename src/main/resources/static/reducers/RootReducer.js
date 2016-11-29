import { combineReducers } from 'redux';
import airplaneReducer from './airplaneReducer';
import airplaneModelsReducer from './airplaneModelsReducer';
import userReducer from './userReducer';
import missionReducer from './missionReducer';
import loginReducer from './loginReducer';
//import all other reducers here


const rootReducer = combineReducers({
  airplaneReducer,
  airplaneModelsReducer,
  userReducer,
  missionReducer,
  loginReducer,
});

export default rootReducer;
