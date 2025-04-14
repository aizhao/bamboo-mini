import request from "../../utils/request";

// 微信登录
export function wxLogin(code) {
  return request({
    url: "/auth/wx-login",
    method: "post",
    data: { code },
  });
}

// 手机号登录
export function phoneLogin(data) {
  return request({
    url: "/auth/phone-login",
    method: "post",
    data,
  });
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: "/auth/user-info",
    method: "get",
  });
}
