import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/login';

const configureStore = compose(applyMiddleware(thunk))(
  createStore,
);

const store = configureStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
