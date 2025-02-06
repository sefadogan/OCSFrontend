import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ordersReduxStateConstants } from "../../../constants/orderConstants";
import {
  getGetOrderByIdUrl,
  orderUrls,
} from "../../../constants/urls/orderUrls";
import {
  buildFilterQuery,
  buildQueryString,
} from "../../../utils/commonHelper";
import { isNullOrEmptyOrUndefined } from "../../../utils/dataCheck";
import { getODataClient } from "../../../utils/odata/odataHelper";
import { sliceNames } from "../../sliceNames";

export const getOrdersTableDataThunkAsync = createAsyncThunk(
  "orders/getOrdersTableDataThunkAsync",
  async ({}, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(setOrdersTableLoading(true));

      const { ordersTable } = getState().ocs[sliceNames.orders];

      const filterValue = buildFilterQuery(ordersTable.filterValues);
      const queryString = buildQueryString({
        PageNumber: ordersTable.loadOptions.pageNumber,
        PageSize: ordersTable.loadOptions.pageSize,
        ...(!isNullOrEmptyOrUndefined(filterValue) && {
          $filter: filterValue,
        }),
      });

      const response = await getODataClient()
        .get(`${orderUrls.LIST_ODATA}?${queryString}`)
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
    updateOrdersTableFilterValues: (state, action) => {
      const { name, value } = action.payload;

      // createdDate.min gibi bir yapı;
      if (name.includes(".")) {
        const [parentKey, childKey] = name.split(".");
        state.ordersTable.filterValues[parentKey][childKey] = value;
      } else {
        state.ordersTable.filterValues[name] = value;
      }
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
  updateOrdersTableFilterValues,
  setOrdersTableSearchBarValue,
  setOrdersTableFilterQuery,
  setOrdersTableSortingValue,
  //end: ordersTable related actions
} = ordersSlice.actions;

export const selectOrders = ({ ocs }) => {
  return ocs[sliceNames.orders];
};

export default ordersSlice.reducer;
