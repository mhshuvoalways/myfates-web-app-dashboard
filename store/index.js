import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import notiReducer from "./reducers/notiReducer";
import btnReducer from "./reducers/btnReducer";
import reportReducer from "./reducers/reportReducer";
import reportsReducer from "./reducers/reportsReducer";

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);
const rootReducer = combineReducers({
  userReducer,
  notiReducer,
  btnReducer,
  reportReducer,
  reportsReducer,
});

const store = createStore(rootReducer, composedEnhancers);

export default store;
