import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/RootReducer';

const logger = createLogger();
const middleware = [ ReduxThunk, logger];
const Store = createStore(rootReducer, {}, applyMiddleware(...middleware));


//All redux-related modules will be exported as 'default'
export default Store;
