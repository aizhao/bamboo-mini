const TokenKey = "Admin-Token";
export function getUser() {
  try {
    const nickname = uni.getStorageSync("nickname");
    const avatar = uni.getStorageSync("avatar");
    const userInfo = {
      nickname,
      avatar,
    };
    return userInfo;
  } catch (error) {
    return null;
  }
}
export function setUser(nickname, avatar) {
  try {
    uni.setStorageSync("nickname", nickname);
    uni.setStorageSync("avatar", avatar);
    return true;
  } catch (error) {
    return false;
  }
}
export function getToken() {
  try {
    const token = uni.getStorageSync(TokenKey);
    return token;
  } catch (error) {
    return null;
  }
}

export function setToken(token) {
  try {
    uni.setStorageSync(TokenKey, token);
    return true;
  } catch (error) {
    return false;
  }
}

export function removeToken() {
  try {
    uni.removeStorageSync(TokenKey);
    return true;
  } catch (error) {
    return false;
  }
}
