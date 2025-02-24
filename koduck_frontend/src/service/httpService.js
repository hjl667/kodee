import axios from 'axios';
import { getToken } from '../utils';

const httpService = axios.create({
  baseURL: 'https://koducks.com/',
});

// 添加请求拦截器
httpService.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 设置Authorization header
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
httpService.interceptors.response.use(function (data) {
  return data;
}, function (error) {
  return Promise.reject(error);
});

export default httpService