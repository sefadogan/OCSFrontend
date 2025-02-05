import { useSelector } from "react-redux";
import { selectOrders } from "../../store/ocs/orders/ordersSlice";

const OCSOrdersPage = () => {
  const { orders } = useSelector(selectOrders);

  return <>{JSON.stringify(orders)}</>;
};

export default OCSOrdersPage;
