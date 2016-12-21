/**
In a Redux architecture we only have ONE store, that ~stores~ all the values into it, creating
an simpler approach to this kind of data relationship.
@see <a href="http://redux.js.org/docs/basics/Store.html">Redux Store</a>
**/
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers/RootReducer';

const logger = createLogger();
const middleware = [ ReduxThunk, logger];
const Store = createStore(rootReducer, {}, applyMiddleware(...middleware));


//All redux-related modules will be exported as 'default'
export default Store;
