import orders from "./orders/ordersSlice";
import { combineReducers } from "@reduxjs/toolkit";

const ocsReducers = combineReducers({ orders });

export default ocsReducers;
