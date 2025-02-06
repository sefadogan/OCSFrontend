import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ordersReduxStateConstants } from "../../../constants/orderConstants";
import { buildQueryString } from "../../../utils/commonHelper";
import { isNullOrEmptyOrUndefined } from "../../../utils/dataCheck";
import { getODataClient } from "../../../utils/odata/odataHelper";
import {
  getGetOrderByIdUrl,
  orderUrls,
} from "../../../constants/urls/orderUrls";
import { sliceNames } from "../../sliceNames";
import axios from "axios";

export const getOrdersTableDataThunkAsync = createAsyncThunk(
  "orders/getOrdersTableDataThunkAsync",
  async ({ filterValue }, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(setOrdersTableLoading(true));

      const { ordersTable } = getState().ocs[sliceNames.orders];

      const filterQuery = buildQueryString({
        PageNumber: ordersTable.loadOptions.pageNumber,
        PageSize: ordersTable.loadOptions.pageSize,
        ...(!isNullOrEmptyOrUndefined(filterValue) && {
          $filter: filterValue,
        }),
      });

      const response = await getODataClient()
        .get(`${orderUrls.LIST_ODATA}?${filterQuery}`)
        .query({});

      const { totalPages, totalRecords } = response;
      dispatch(setOrdersTableTotalPages(totalPages));
      dispatch(setOrdersTableTotalRecords(totalRecords));

      return response.data;
    } catch (err) {
      //TODO: handle api failure

      return rejectWithValue(err.response.data);
    } finally {
      dispatch(setOrdersTableLoading(false));
    }
  }
);

export const getOrderByIdThunkAsync = createAsyncThunk(
  "orders/getOrderByIdThunkAsync",
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setIsOrderLoading(true));

      const response = await axios(getGetOrderByIdUrl(id));

      return response.data;
    } catch (err) {
      //TODO: handle api failure

      return rejectWithValue(err.response.data);
    } finally {
      dispatch(setIsOrderLoading(false));
    }
  }
);

const initialState = {
  order: null,
  isOrderLoading: true,
  ordersTable: {
    dataList: [],
    totalPages: 0,
    totalRecords: 0,
    filterQuery: null,
    filterValues: ordersReduxStateConstants.ordersTableFilterValues,
    loadOptions: ordersReduxStateConstants.ordersTableLoadOptions,
  },
};

const ordersSlice = createSlice({
  name: sliceNames.orders,
  initialState: initialState,
  reducers: {
    resetWholeOrdersState: () => initialState,

    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setIsOrderLoading: (state, action) => {
      state.isOrderLoading = action.payload;
    },

    //start: ordersTable related actions
    resetWholeOrdersTableOptions: (state, action) => {
      state.ordersTable = initialState.ordersTable;
    },
    setOrdersTableLoading: (state, action) => {
      state.ordersTable.loadOptions.isLoading = action.payload;
    },
    setOrdersTablePageNumber: (state, action) => {
      state.ordersTable.loadOptions.pageNumber = action.payload;
    },
    setOrdersTablePageSize: (state, action) => {
      state.ordersTable.loadOptions.pageSize = action.payload;
    },
    setOrdersTableTotalPages: (state, action) => {
      state.ordersTable.totalPages = action.payload;
    },
    setOrdersTableTotalRecords: (state, action) => {
      state.ordersTable.totalRecords = action.payload;
    },
    setOrdersTableFilterValues: (state, action) => {
      state.ordersTable.filterValues = action.payload;
    },
    setOrdersTableSearchBarValue: (state, action) => {
      state.ordersTable.searchBarValue = action.payload;
    },
    setOrdersTableFilterQuery: (state, action) => {
      state.ordersTable.filterQuery = action.payload;
    },
    setOrdersTableSortingValue: (state, action) => {
      state.ordersTable.sortingValue = action.payload;
    },
    //end: ordersTable related actions
  },
  extraReducers: {
    [getOrdersTableDataThunkAsync.fulfilled]: (state, action) => {
      state.ordersTable.dataList = action.payload;
    },
    [getOrderByIdThunkAsync.fulfilled]: (state, action) => {
      state.order = action.payload.data;
    },
  },
});

export const {
  resetWholeOrdersState,

  setOrder,
  setIsOrderLoading,

  //start: ordersTable related actions
  resetWholeOrdersTableOptions,
  setOrdersTableLoading,
  setOrdersTablePageNumber,
  setOrdersTablePageSize,
  setOrdersTableTotalPages,
  setOrdersTableTotalRecords,
  setOrdersTableFilterValues,
  setOrdersTableSearchBarValue,
  setOrdersTableFilterQuery,
  setOrdersTableSortingValue,
  //end: ordersTable related actions
} = ordersSlice.actions;

export const selectOrders = ({ ocs }) => {
  return ocs[sliceNames.orders];
};

export default ordersSlice.reducer;
