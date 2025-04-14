import request from "../../utils/request";

// 获取用户信息
export function getProfile() {
  return request({
    url: "/users/profile",
    method: "get",
  });
}

// 更新用户信息
export function updateProfile(data) {
  return request({
    url: "/users/profile",
    method: "put",
    data,
  });
}
