import axios from "axios";

//TODO: env'dan al
axios.defaults.baseURL = "https://localhost:44391";
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
