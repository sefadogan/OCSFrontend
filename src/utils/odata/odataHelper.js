import moment from "moment";
import { o as ODataClient } from "odata";

export const getODataClient = () => {
  return new ODataClient(process.env.REACT_APP_API_URL);
};

export const formatDateForOData = (date) => {
  if (!date) return null;
  return moment(date).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
};
