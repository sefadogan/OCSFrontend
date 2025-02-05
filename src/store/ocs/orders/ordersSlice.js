import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [{ id: 1 }],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    resetWholeOrdersState: () => initialState,
  },
  extraReducers: {},
});

export const { resetWholeOrdersState } = ordersSlice.actions;

export const selectOrders = ({ ocs }) => {
  return ocs["orders"];
};

export default ordersSlice.reducer;
