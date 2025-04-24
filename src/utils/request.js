import { getToken, setToken, removeToken } from "./auth";

// 判断是否为开发环境
const isDev = process.env.NODE_ENV === "development";
const baseURL = isDev ? "http://localhost:3000/api" : "https://your-production-api.com/api";

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
    console.log("请求 - 当前token:", token ? "已设置" : "未设置");

    // 构建请求头
    const header = {
      "Content-Type": "application/json",
    };

    // 如果有token，添加到请求头
    if (token) {
      header["Authorization"] = `Bearer ${token}`;
      console.log("请求 - 已添加Authorization头");
    } else {
      console.log("请求 - 未添加Authorization头，token不存在");
    }

    // 构建完整URL
    const url = baseURL + options.url;
    console.log("请求URL:", url);
    console.log("请求方法:", options.method || "GET");
    console.log("请求头:", header);
    console.log("请求参数:", options.data || options.params);

    // 发送请求
    uni.request({
      url,
      method: options.method || "GET",
      data: options.method === "GET" ? options.params : options.data,
      header,
      success: res => {
        console.log("响应 - 状态码:", res.statusCode);
        console.log("响应 - 数据:", res.data);

        // 处理响应
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const responseData = res.data;

          if (responseData.code === 0) {
            resolve(responseData);
          } else if (responseData.code === 401) {
            console.log("响应 - 401错误，清除token");
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
              message = "未授权，请重新登录";
              console.log("响应 - 401错误，清除token");
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
