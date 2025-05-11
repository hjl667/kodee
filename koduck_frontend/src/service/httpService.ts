import axios from "axios";
import { getToken } from "@/utils/utils";

const httpService = axios.create({
  baseURL: "https://koducks.com/",
});

httpService.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use(
  function (data) {
    return data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default httpService;
