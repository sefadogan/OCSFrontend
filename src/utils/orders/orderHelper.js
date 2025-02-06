import {
  orderReleasedForDistributionOptions,
  orderStatusOptions,
} from "../../constants/orderConstants";

export const getOrderStatusById = (id) =>
  orderStatusOptions.find((status) => status.value === id);

export const getReleaseForDistributionById = (id) =>
  orderReleasedForDistributionOptions.find((item) => item.value === id);
