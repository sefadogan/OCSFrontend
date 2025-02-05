import { useSelector } from "react-redux";
import OCSInfoCards from "../../components/cards-info";
import OCSDeliveryProgressBar from "../../components/progress-bars/delivery";
import OrderTable from "../../components/table";
import { selectOrders } from "../../store/ocs/orders/ordersSlice";

const OCSOrdersPage = () => {
  const { orders } = useSelector(selectOrders);

  const infoCardsData = [
    { title: "Rotadaki Paket", value: 721 },
    { title: "DM Paket Sayısı", value: 367 },
    { title: "Dağıtıma Çıkan Paket", value: 250 },
    { title: "Teslim Edildi", value: 120 },
    { title: "Teslim Edilemedi", value: 20 },
  ];

  return (
    <div className="flex flex-col w-full p-[1.5rem] gap-[1.5rem]">
      <OCSInfoCards data={infoCardsData} />

      <OCSDeliveryProgressBar total={400} completed={300} />

      <OrderTable />
    </div>
  );
};

export default OCSOrdersPage;
