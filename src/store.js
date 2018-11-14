/*
 * src/store.js
 * With initialState
*/
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/RootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
const middleware = [
  thunk,
];

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
    ));
 return store
}