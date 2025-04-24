import request from "@/utils/request";

// 手机号登录
export const phoneLogin = data => {
  return request({
    url: "/user/phone-login",
    method: "POST",
    data,
  });
};

// 账号密码登录
export const accountLogin = data => {
  return request({
    url: "/user/login",
    method: "POST",
    data,
  });
};

// 注册账号
export const register = data => {
  return request({
    url: "/user/register",
    method: "POST",
    data,
  });
};

// 忘记密码
export const forgetPassword = data => {
  return request({
    url: "/user/forget-password",
    method: "POST",
    data,
  });
};
