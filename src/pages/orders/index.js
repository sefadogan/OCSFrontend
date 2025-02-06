import { useSelector } from "react-redux";
import OCSInfoCards from "../../components/_shared/cards-info";
import OCSDeliveryProgressBar from "../../components/_shared/progress-bars/delivery";
import OrderTable from "../../components/_shared/table";
import { selectOrders } from "../../store/ocs/orders/ordersSlice";
import OCSTitleSeperator from "../../components/_shared/seperators/title";
import OCSOrdersFilteringForm from "../../components/orders/filtering-form";
import { useEffect } from "react";

const OCSOrdersPage = () => {
  const { orders } = useSelector(selectOrders);

  const infoCardsData = [
    { title: "Rotadaki Paket", value: 721 },
    { title: "DM Paket Sayısı", value: 367 },
    { title: "Dağıtıma Çıkan Paket", value: 250 },
    { title: "Teslim Edildi", value: 120 },
    { title: "Teslim Edilemedi", value: 20 },
  ];

  useEffect(() => {
    return () => {
      // ..
      // handleOrderPageLeave();
    };
  }, []);

  return (
    <div className="flex flex-col w-full p-[1.5rem] gap-[1.5rem]">
      <OCSInfoCards data={infoCardsData} />

      <OCSDeliveryProgressBar total={400} completed={300} />

      <OCSTitleSeperator
        titleClassName="text-2xl font-bold"
        title="SİPARİŞ KONTROL EKRANI"
      />

      <OCSOrdersFilteringForm />

      <OrderTable />
    </div>
  );
};

export default OCSOrdersPage;
