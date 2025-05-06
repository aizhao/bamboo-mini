<template>
  <view class="login-container">
    <view class="logo">
      <image src="/static/logo.png" mode="aspectFit"></image>
    </view>
    <view class="title">欢迎使用竹艺商城</view>
    <view class="subtitle">请登录以继续使用</view>

    <!-- 登录表单 -->
    <view class="login-form">
      <view class="form-item">
        <input type="text" v-model="form.username" placeholder="请输入账号" class="input" />
      </view>
      <view class="form-item">
        <input type="password" v-model="form.password" placeholder="请输入密码" class="input" />
      </view>
    </view>

    <!-- 登录按钮组 -->
    <view class="login-buttons">
      <button class="login-btn account-btn" @click="handleAccountLogin">账号密码登录</button>
      <button class="login-btn phone-btn" open-type="getPhoneNumber" @getphonenumber="handleGetPhoneNumber">手机号一键登录</button>
    </view>

    <!-- 其他操作 -->
    <view class="other-actions">
      <text class="action-link" @click="goToRegister">注册账号</text>
      <text class="action-link" @click="goToForgetPassword">忘记密码</text>
    </view>
  </view>
</template>

<script>
import { phoneLogin, accountLogin } from "@/api/auth";
import { setToken, getToken, setUser, removeToken, getUser } from "@/utils/auth";

export default {
  data() {
    return {
      code: "",
      form: {
        username: "",
        password: "",
      },
    };
  },
  onLoad() {
    // 获取微信登录code
    // this.getWxCode();

    // 检查是否已登录
    // removeToken();
    const token = getToken();
    // removeToken();
    if (token) {
      uni.switchTab({
        url: "/pages/index/index",
      });
    }
  },
  methods: {
    // 获取微信登录code
    getWxCode() {
      uni.login({
        provider: "weixin",
        success: res => {
          this.code = res.code;
        },
        fail: err => {
          uni.showToast({
            title: "微信登录失败",
            icon: "none",
          });
        },
      });
    },

    // 处理账号密码登录
    async handleAccountLogin() {
      if (!this.form.username || !this.form.password) {
        uni.showToast({
          title: "请输入账号和密码",
          icon: "none",
        });
        return;
      }

      try {
        const res = await accountLogin(this.form);

        if (res.code === 0 && res.data.token) {
          // 保存token
          const token = res.data.token;

          // 保存token
          setToken(token);
          setUser(res.data.user.nickname, res.data.user.avatar);
          // console.log(getUser(), "7777");
          // 验证token是否保存成功
          const savedToken = getToken();

          if (!savedToken) {
            uni.showToast({
              title: "登录成功，但token保存失败",
              icon: "none",
            });
            return;
          }

          // 登录成功，跳转到首页
          uni.switchTab({
            url: "/pages/user/index",
          });
        } else {
          uni.showToast({
            title: res.message || "登录失败",
            icon: "none",
          });
        }
      } catch (error) {
        uni.showToast({
          title: error.message || "登录失败",
          icon: "none",
        });
      }
    },

    // 处理获取手机号
    async handleGetPhoneNumber(e) {
      if (e.detail.errMsg !== "getPhoneNumber:ok") {
        uni.showToast({
          title: "获取手机号失败",
          icon: "none",
        });
        return;
      }

      try {
        const res = await phoneLogin({
          code: this.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        });

        if (res.code === 0 && res.data.token) {
          // 保存token
          const token = res.data.token;
          console.log("登录页面 - 手机号登录成功，保存token:", token);

          // 保存token
          setToken(token);

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
          uni.showToast({
            title: res.message || "登录失败",
            icon: "none",
          });
        }
      } catch (error) {
        console.error("登录页面 - 手机号登录异常:", error);
        uni.showToast({
          title: error.message || "登录失败",
          icon: "none",
        });
      }
    },

    // 跳转到注册页面
    goToRegister() {
      uni.navigateTo({
        url: "/pages/register/index",
      });
    },

    // 跳转到忘记密码页面
    goToForgetPassword() {
      uni.navigateTo({
        url: "/pages/forget-password/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  min-height: 100vh;
  background-color: #f8f8f8;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin: 100rpx 0 40rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 60rpx;
}

.login-form {
  width: 100%;
  margin-bottom: 40rpx;
}

.form-item {
  background-color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
}

.input {
  width: 100%;
  height: 80rpx;
  font-size: 28rpx;
}

.login-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.login-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  border-radius: 44rpx;
  font-size: 32rpx;
  color: #fff;
}

.account-btn {
  background-color: #4caf50;
}

.phone-btn {
  background-color: #2196f3;
}

.other-actions {
  margin-top: 40rpx;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 40rpx;
}

.action-link {
  font-size: 28rpx;
  color: #666;
}
</style>
