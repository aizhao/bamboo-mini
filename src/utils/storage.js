/**
 * 存储工具类，用于替代localStorage
 * 在微信小程序中使用wx.setStorage和wx.getStorage
 */

// 存储键名常量
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER_INFO: "userInfo",
  SETTINGS: "settings",
};

/**
 * 设置存储数据
 * @param {string} key - 存储键名
 * @param {any} data - 要存储的数据
 * @returns {Promise} - 返回Promise对象
 */
export const setStorage = (key, data) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(`设置存储数据 - 键: ${key}, 值:`, data);
      uni.setStorageSync(key, data);
      resolve();
    } catch (error) {
      console.error("存储数据失败:", error);
      reject(error);
    }
  });
};

/**
 * 获取存储数据
 * @param {string} key - 存储键名
 * @returns {Promise<any>} - 返回Promise对象，包含存储的数据
 */
export const getStorage = key => {
  return new Promise((resolve, reject) => {
    try {
      const data = uni.getStorageSync(key);
      console.log(`获取存储数据 - 键: ${key}, 值:`, data);
      resolve(data);
    } catch (error) {
      console.error(`获取数据失败 - 键: ${key}:`, error);
      reject(error);
    }
  });
};

/**
 * 移除存储数据
 * @param {string} key - 存储键名
 * @returns {Promise} - 返回Promise对象
 */
export const removeStorage = key => {
  return new Promise((resolve, reject) => {
    try {
      console.log(`移除存储数据 - 键: ${key}`);
      uni.removeStorageSync(key);
      resolve();
    } catch (error) {
      console.error(`移除数据失败 - 键: ${key}:`, error);
      reject(error);
    }
  });
};

/**
 * 清除所有存储数据
 * @returns {Promise} - 返回Promise对象
 */
export const clearStorage = () => {
  return new Promise((resolve, reject) => {
    try {
      console.log("清除所有存储数据");
      uni.clearStorageSync();
      resolve();
    } catch (error) {
      console.error("清除数据失败:", error);
      reject(error);
    }
  });
};

/**
 * 获取token
 * @returns {string|null} - 返回token或null
 */
export const getToken = () => {
  try {
    const token = uni.getStorageSync(STORAGE_KEYS.TOKEN);
    console.log("获取token:", token ? "已获取" : "未获取");
    return token;
  } catch (error) {
    console.error("获取token失败:", error);
    return null;
  }
};

/**
 * 设置token
 * @param {string} token - token值
 * @returns {Promise} - 返回Promise对象
 */
export const setToken = token => {
  console.log("设置token:", token);
  return setStorage(STORAGE_KEYS.TOKEN, token);
};

/**
 * 移除token
 * @returns {Promise} - 返回Promise对象
 */
export const removeToken = () => {
  console.log("移除token");
  return removeStorage(STORAGE_KEYS.TOKEN);
};
