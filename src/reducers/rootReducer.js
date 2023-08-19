// rootReducer.js
import { combineReducers } from "redux";
import todosReducer from "./todo";
import authReducer from "./auth";
const rootReducer = combineReducers({
    todos: todosReducer,
    auth:authReducer
  });
  
  export default rootReducer;
  