import { combineReducers } from 'redux';
import airplaneReducer from './airplaneReducer';
import userReducer from './userReducer';
//import all other reducers here


const rootReducer = combineReducers({
  airplaneReducer,
  userReducer,
});

export default rootReducer;
