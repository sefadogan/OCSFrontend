import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderReleasedForDistributionOptions,
  orderStatusOptions,
} from "../../../constants/orderConstants";
import {
  clearOrdersTableFilterValues,
  getOrdersTableDataThunkAsync,
  selectOrders,
  updateOrdersTableFilterValues,
} from "../../../store/ocs/orders/ordersSlice";
import { isObjectValuesEmpty } from "../../../utils/commonHelper";
import OCSButton from "../../_shared/button";
import OCSDatePicker from "../../_shared/form-elements/date-picker";
import OCSSelect from "../../_shared/form-elements/select";
import OCSTextField from "../../_shared/form-elements/text-field";

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

  const handleClearFilteringForm = async () => {
    await dispatch(clearOrdersTableFilterValues());
    dispatch(getOrdersTableDataThunkAsync({}));
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
      <OCSTextField
        label="Gönderi Takip No"
        name="shipmentTrackingNo"
        value={ordersTable.filterValues.shipmentTrackingNo}
        onChange={handleChange}
      />

      <OCSTextField
        label="Sipariş Takip No"
        name="orderTrackingNo"
        value={ordersTable.filterValues.orderTrackingNo}
        onChange={handleChange}
      />

      <OCSDatePicker
        label="Oluşturulma Tarihi (Başlangıç)"
        value={ordersTable.filterValues.createdDate.min}
        maxDate={ordersTable.filterValues.createdDate.max}
        onChange={(value) => handleDateChange("createdDate.min", value)}
      />
      <OCSDatePicker
        label="Oluşturulma Tarihi (Bitiş)"
        value={ordersTable.filterValues.createdDate.max}
        minDate={ordersTable.filterValues.createdDate.min}
        onChange={(value) => handleDateChange("createdDate.max", value)}
      />

      <OCSSelect
        select
        label="Durum"
        name="status"
        value={ordersTable.filterValues.status}
        onChange={handleChange}
        options={orderStatusOptions}
      />

      {/* select yerine switch box daha uygun olur */}
      <OCSSelect
        select
        label="Dağıtım Durumu"
        name="releasedForDistribution"
        value={ordersTable.filterValues.releasedForDistribution}
        onChange={handleChange}
        options={orderReleasedForDistributionOptions}
      />

      <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-end gap-[1rem]">
        <OCSButton
          bgColor="#e3e3e3"
          textColor="#444444"
          text="Temizle"
          minWidth="8.75rem"
          onClick={handleClearFilteringForm}
          disabled={
            ordersTable.loadOptions.isLoading ||
            isObjectValuesEmpty(ordersTable.filterValues)
          }
        />
        <OCSButton
          type="submit"
          bgColor="#444444"
          text="Filtrele"
          minWidth="8.75rem"
          disabled={
            ordersTable.loadOptions.isLoading ||
            isObjectValuesEmpty(ordersTable.filterValues)
          }
        />
      </div>
    </form>
  );
};

export default OCSOrdersFilteringForm;
