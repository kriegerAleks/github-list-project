import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import * as reducers from "./ducks";

export const history = createBrowserHistory({
  // this lets the basename be altered which allows the app to be served
  // on a subdirectory
  basename: process.env.REACT_APP_ROUTE_BASENAME || undefined,
});

const rootReducer = combineReducers({
  ...reducers,
  router: connectRouter(history),
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, routerMiddleware(history))
  )
);

export default store;
