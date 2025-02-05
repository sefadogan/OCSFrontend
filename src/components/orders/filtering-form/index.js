import { Button, Card, CardContent, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState } from "react";

const statuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
const distributionStatuses = ["Pending", "Released", "In Progress"];

const OCSOrdersFilteringForm = ({}) => {
  const [formData, setFormData] = useState({
    shipmentTrackingNo: "",
    orderTrackingNo: "",
    plateNumber: "",
    createdDateMin: null,
    createdDateMax: null,
    status: "",
    releasedForDistribution: "",
  });
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
    >
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

      <TextField
        label="Plaka"
        name="plateNumber"
        value={formData.plateNumber}
        onChange={handleChange}
        fullWidth
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Tarih Aralığı"
          value={formData.createdDateMin}
          onChange={(value) => handleDateChange("createdDateMin", value)}
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
        {statuses.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Dağıtım Durumu"
        name="releasedForDistribution"
        value={formData.releasedForDistribution}
        onChange={handleChange}
        fullWidth
      >
        {distributionStatuses.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>

      <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-end">
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
        >
          Filtrele
        </Button>
      </div>
    </form>
  );
};

export default OCSOrdersFilteringForm;
