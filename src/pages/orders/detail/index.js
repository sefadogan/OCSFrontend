import { useParams } from "react-router-dom";

const OCSOrderDetailPage = () => {
  const { id } = useParams();

  return <span>Sipariş No: {id}</span>;
};

export default OCSOrderDetailPage;
