import { combineReducers } from 'redux';
import airplaneReducer from './airplaneReducer';
//import all other reducers here


const rootReducer = combineReducers({
  airplaneReducer
});

export default rootReducer;
