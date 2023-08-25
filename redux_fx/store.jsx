import { createStore, applyMiddleware } from "redux";
// import reducer from '../reducers'
import reducer from "./reducers";
import thunk from "redux-thunk";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
// import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { composeWithDevTools } from "@redux-devtools/extension";

const composeEnhancers = composeWithDevTools({});
const makeStore = (context) =>
  createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export const wrapper = createWrapper(makeStore, { debug: true });
