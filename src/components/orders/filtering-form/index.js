import { Button, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderReleasedForDistributionOptions,
  orderStatusOptions,
} from "../../../constants/orderConstants";
import {
  getOrdersTableDataThunkAsync,
  selectOrders,
  updateOrdersTableFilterValues,
} from "../../../store/ocs/orders/ordersSlice";
import { isObjectValuesEmpty } from "../../../utils/commonHelper";

const OCSOrdersFilteringForm = ({}) => {
  const dispatch = useDispatch();

  const { ordersTable } = useSelector(selectOrders);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateOrdersTableFilterValues({ name, value }));
  };
  const handleDateChange = (name, value) => {
    dispatch(updateOrdersTableFilterValues({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ordersTable.loadOptions.isLoading) return;

    dispatch(getOrdersTableDataThunkAsync({}));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
    >
      {/* TODO: tüm form input'lar için component */}
      <TextField
        label="Gönderi Takip No"
        name="shipmentTrackingNo"
        value={ordersTable.filterValues.shipmentTrackingNo}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Sipariş Takip No"
        name="orderTrackingNo"
        value={ordersTable.filterValues.orderTrackingNo}
        onChange={handleChange}
        fullWidth
      />

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Oluşturulma Tarihi (Başlangıç)"
          value={ordersTable.filterValues.createdDate.min}
          onChange={(value) => handleDateChange("createdDate.min", value)}
          maxDate={ordersTable.filterValues.createdDate.max}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <DatePicker
          label="Oluşturulma Tarihi (Bitiş)"
          value={ordersTable.filterValues.createdDate.max}
          minDate={ordersTable.filterValues.createdDate.min}
          onChange={(value) => handleDateChange("createdDate.max", value)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>

      <TextField
        select
        label="Durum"
        name="status"
        value={ordersTable.filterValues.status}
        onChange={handleChange}
        fullWidth
      >
        {orderStatusOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </TextField>

      {/* select yerine switch box daha uygun olur */}
      <TextField
        select
        label="Dağıtım Durumu"
        name="releasedForDistribution"
        value={ordersTable.filterValues.releasedForDistribution}
        onChange={handleChange}
        fullWidth
      >
        {orderReleasedForDistributionOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </TextField>

      <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-end gap-[1rem]">
        {/* TODO: button component */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#444444",
            textTransform: "none",
            fontSize: "1rem",
            minWidth: "8.75rem",
            fontWeight: 500,
            borderRadius: ".5rem",
            ":hover": {
              backgroundColor: "#444444",
            },
          }}
          disabled={
            ordersTable.loadOptions.isLoading ||
            isObjectValuesEmpty(ordersTable.filterValues)
          }
        >
          Filtrele
        </Button>
      </div>
    </form>
  );
};

export default OCSOrdersFilteringForm;
