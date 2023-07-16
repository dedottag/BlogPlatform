import { createStore, combineReducers, applyMiddleware } from "redux";
import { articleReduser } from "./articleReduser";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  articles: articleReduser,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
