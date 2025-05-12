import { getToken, setToken, removeToken } from "./auth";

// 判断是否为开发环境
const isDev = process.env.NODE_ENV === "development";
const baseURL = isDev ? "http://47.108.223.229:80/api" : "https://your-production-api.com/api";

console.log("当前环境:", isDev ? "开发环境" : "生产环境");
console.log("API基础URL:", baseURL);

/**
 * 请求函数
 * @param {Object} options - 请求配置
 * @returns {Promise} - 返回Promise对象
 */
const request = options => {
  return new Promise((resolve, reject) => {
    // 获取token
    const token = getToken();

    // 构建请求头
    const header = {
      "Content-Type": "application/json",
    };

    // 如果有token，添加到请求头
    if (token) {
      header["Authorization"] = `Bearer ${token}`;
    } else {
    }

    // 构建完整URL
    const url = baseURL + options.url;

    // 发送请求
    uni.request({
      url,
      method: options.method || "GET",
      data: options.method === "GET" ? options.params : options.data,
      header,
      success: res => {
        // 处理响应
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const responseData = res.data;

          if (responseData.code === 0) {
            resolve(responseData);
          } else if (responseData.code === 401) {
            removeToken();
            uni.showToast({
              title: "登录已过期，请重新登录",
              icon: "none",
            });
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/login/index",
              });
            }, 1500);
            reject(new Error(responseData.message || "登录已过期"));
          } else {
            uni.showToast({
              title: responseData.message || "请求失败",
              icon: "none",
            });
            reject(new Error(responseData.message || "请求失败"));
          }
        } else {
          // 处理HTTP错误
          let message = "网络请求失败";
          switch (res.statusCode) {
            case 401:
              message = "请登录后使用";
              removeToken();
              setTimeout(() => {
                uni.navigateTo({
                  url: "/pages/login/index",
                });
              }, 1500);
              break;
            case 403:
              message = "拒绝访问";
              break;
            case 404:
              message = "请求错误，未找到该资源";
              break;
            case 500:
              message = "服务器错误";
              break;
            default:
              message = `连接错误${res.statusCode}`;
          }

          uni.showToast({
            title: message,
            icon: "none",
          });
          reject(new Error(message));
        }
      },
      fail: err => {
        console.error("请求失败:", err);
        uni.showToast({
          title: "网络连接异常，请稍后重试",
          icon: "none",
        });
        reject(err);
      },
    });
  });
};

// 添加便捷方法
request.get = (url, params) => {
  return request({
    url,
    method: "GET",
    params,
  });
};

request.post = (url, data) => {
  return request({
    url,
    method: "POST",
    data,
  });
};

request.put = (url, data) => {
  return request({
    url,
    method: "PUT",
    data,
  });
};

request.delete = (url, data) => {
  return request({
    url,
    method: "DELETE",
    data,
  });
};

export default request;
