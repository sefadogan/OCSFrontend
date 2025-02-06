import { Button, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderReleasedForDistributionOptions,
  orderStatusOptions,
} from "../../../constants/orderConstants";
import {
  getOrdersTableDataThunkAsync,
  selectOrders,
} from "../../../store/ocs/orders/ordersSlice";
import { buildFilterQuery } from "../../../utils/commonHelper";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const OCSOrdersFilteringForm = ({}) => {
  const dispatch = useDispatch();

  const { ordersTable } = useSelector(selectOrders);

  const [formData, setFormData] = useState({
    shipmentTrackingNo: "",
    orderTrackingNo: "",
    createdDate: {
      min: null,
      max: null,
    },
    status: "",
    releasedForDistribution: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setFormData((prev) => {
      const [parentKey, childKey] = name.split(".");

      return {
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value,
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ordersTable.loadOptions.isLoading) return;

    const filterQuery = buildFilterQuery(formData);
    dispatch(getOrdersTableDataThunkAsync({ filterValue: filterQuery }));
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
        value={formData.shipmentTrackingNo}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Sipariş Takip No"
        name="orderTrackingNo"
        value={formData.orderTrackingNo}
        onChange={handleChange}
        fullWidth
      />

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Oluşturulma Tarihi (Başlangıç)"
          value={formData.createdDate.min}
          onChange={(value) => handleDateChange("createdDate.min", value)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <DatePicker
          label="Oluşturulma Tarihi (Bitiş)"
          value={formData.createdDate.max}
          onChange={(value) => handleDateChange("createdDate.max", value)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>

      <TextField
        select
        label="Durum"
        name="status"
        value={formData.status}
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
        value={formData.releasedForDistribution}
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
          disabled={ordersTable.loadOptions.isLoading}
        >
          Filtrele
        </Button>
      </div>
    </form>
  );
};

export default OCSOrdersFilteringForm;
