import axios from "axios";
import { getToken, removeToken } from "./auth";

// 创建axios实例
const request = axios.create({
  baseURL: "http://localhost:3000/api", // API的base_url
  timeout: 5000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    console.error("请求错误:", error);
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    const res = response.data;
    return res;
  },
  error => {
    // 对响应错误做点什么
    console.error("响应错误:", error);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          removeToken();
          uni.navigateTo({
            url: "/pages/login/index",
          });
          break;
        case 403:
          uni.showToast({
            title: "拒绝访问",
            icon: "none",
          });
          break;
        case 404:
          uni.showToast({
            title: "请求错误,未找到该资源",
            icon: "none",
          });
          break;
        case 500:
          uni.showToast({
            title: "服务器端出错",
            icon: "none",
          });
          break;
        default:
          uni.showToast({
            title: `连接错误${error.response.status}`,
            icon: "none",
          });
      }
    } else {
      uni.showToast({
        title: "连接到服务器失败",
        icon: "none",
      });
    }
    return Promise.reject(error);
  },
);

export default request;
