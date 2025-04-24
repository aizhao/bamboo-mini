const TokenKey = "Admin-Token";

export function getToken() {
  try {
    const token = uni.getStorageSync(TokenKey);
    console.log("auth.js - 获取token:", token ? "已获取" : "未获取");
    return token;
  } catch (error) {
    console.error("auth.js - 获取token失败:", error);
    return null;
  }
}

export function setToken(token) {
  try {
    console.log("auth.js - 设置token:", token);
    uni.setStorageSync(TokenKey, token);
    console.log("auth.js - 设置token成功");
    return true;
  } catch (error) {
    console.error("auth.js - 设置token失败:", error);
    return false;
  }
}

export function removeToken() {
  try {
    console.log("auth.js - 移除token");
    uni.removeStorageSync(TokenKey);
    console.log("auth.js - 移除token成功");
    return true;
  } catch (error) {
    console.error("auth.js - 移除token失败:", error);
    return false;
  }
}
