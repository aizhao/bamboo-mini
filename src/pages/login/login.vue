<template>
  <view class="login-container">
    <view class="login-form">
      <view class="form-item">
        <input type="text" v-model="username" placeholder="请输入用户名" />
      </view>
      <view class="form-item">
        <input type="password" v-model="password" placeholder="请输入密码" />
      </view>
      <view class="form-item">
        <button @click="handleLogin" :disabled="loading">{{ loading ? "登录中..." : "登录" }}</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import request from "@/utils/request";
import { setToken, getToken } from "@/utils/storage";

console.log("登录页面加载");

const username = ref("");
const password = ref("");
const loading = ref(false);

// 检查是否已登录
onMounted(() => {
  const token = getToken();
  console.log("登录页面 - 检查token:", token ? "已存在" : "不存在");

  if (token) {
    console.log("登录页面 - 已有token，跳转到首页");
    uni.switchTab({
      url: "/pages/index/index",
    });
  }
});

const handleLogin = async () => {
  if (!username.value || !password.value) {
    uni.showToast({
      title: "请输入用户名和密码",
      icon: "none",
    });
    return;
  }

  loading.value = true;
  console.log("登录页面 - 开始登录，用户名:", username.value);

  try {
    const res = await request.post("/user/login", {
      username: username.value,
      password: password.value,
    });

    console.log("登录页面 - 登录响应:", res);

    if (res.code === 0) {
      // 保存token
      const token = res.data.token;
      console.log("登录页面 - 登录成功，保存token:", token);

      // 直接使用uni.setStorageSync保存token
      try {
        uni.setStorageSync("token", token);
        console.log("登录页面 - 使用uni.setStorageSync保存token成功");
      } catch (e) {
        console.error("登录页面 - 使用uni.setStorageSync保存token失败:", e);
      }

      // 同时使用setToken方法保存
      await setToken(token);

      // 验证token是否保存成功
      const savedToken = getToken();
      console.log("登录页面 - 验证token保存:", savedToken ? "成功" : "失败");

      if (!savedToken) {
        console.error("登录页面 - token保存失败，请检查存储功能");
        uni.showToast({
          title: "登录成功，但token保存失败",
          icon: "none",
        });
        return;
      }

      // 登录成功，跳转到首页
      uni.switchTab({
        url: "/pages/index/index",
      });
    } else {
      console.log("登录页面 - 登录失败:", res.message);
      uni.showToast({
        title: res.message || "登录失败",
        icon: "none",
      });
    }
  } catch (error) {
    console.error("登录页面 - 登录异常:", error);
    uni.showToast({
      title: error.message || "登录失败",
      icon: "none",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  width: 80%;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-item {
  margin-bottom: 20px;
}

.form-item input {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-item button {
  width: 100%;
  height: 40px;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}

.form-item button:disabled {
  background-color: #ccc;
}
</style>
