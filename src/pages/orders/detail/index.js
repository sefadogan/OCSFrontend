import { Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOrderByIdThunkAsync,
  selectOrders,
} from "../../../store/ocs/orders/ordersSlice";

const OCSOrderDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, isOrderLoading } = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrderByIdThunkAsync({ id }));
  }, [id]);

  return isOrderLoading ? (
    <Skeleton width="15rem" height="3rem" />
  ) : (
    JSON.stringify(order ?? "-")
  );
};

export default OCSOrderDetailPage;
