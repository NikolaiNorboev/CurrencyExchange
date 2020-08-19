import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import dataReducer from './reducers/data';
import errorReducer from './reducers/error';
import grafReducer from './reducers/graf';

// const storageState = window.localStorage.getItem('state');
// const initialState = storageState ? JSON.parse(storageState) : undefined;

const store = createStore(
  combineReducers({
    data: dataReducer,
    err: errorReducer,
    graf: grafReducer,
  }),
  // initialState,
  {},
  composeWithDevTools()
);

// store.subscribe(() => {
//   const state = store.getState();
//   window.localStorage.setItem('state', JSON.stringify(state));
// }); 

export default store;
