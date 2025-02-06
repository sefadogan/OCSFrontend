import { o as ODataClient } from "odata";

export const getODataClient = () => {
  //TODO: env'a ekle
  return new ODataClient("https://localhost:44391");
};
