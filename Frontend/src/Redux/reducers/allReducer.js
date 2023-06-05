import currentUser from "./currentUser";
import addNewAddress from "./addNewAddress";

import allAddress from "./storeAllAddress";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  currentUser,
  addNewAddress,
  allAddress,
});

export default rootReducer;
