import { combineReducers } from "@reduxjs/toolkit";
import ocs from "./ocs";

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    ocs,
    ...asyncReducers,
  });

  return combinedReducer(state, action);
};

export default createReducer;
