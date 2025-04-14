<template>
  <view class="login-container">
    <view class="logo">
      <image src="/static/logo.png" mode="aspectFit"></image>
    </view>
    <view class="title">欢迎使用竹艺商城</view>
    <view class="subtitle">请登录以继续使用</view>

    <button class="login-btn" open-type="getPhoneNumber" @getphonenumber="handleGetPhoneNumber">手机号一键登录</button>
  </view>
</template>

<script>
import { phoneLogin } from "@/api/auth";
import { setToken } from "@/utils/auth";

export default {
  data() {
    return {
      code: "",
    };
  },
  onLoad() {
    // 获取微信登录code
    this.getWxCode();
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
        // 发送手机号到后端进行登录
        const res = await phoneLogin({
          code: this.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        });

        if (res.token) {
          // 保存token
          setToken(res.token);

          // 登录成功，跳转到首页
          uni.switchTab({
            url: "/pages/index/index",
          });
        }
      } catch (error) {
        uni.showToast({
          title: error.message || "登录失败",
          icon: "none",
        });
      }
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
  margin-bottom: 80rpx;
}

.login-btn {
  width: 80%;
  height: 88rpx;
  line-height: 88rpx;
  background-color: #07c160;
  color: #fff;
  font-size: 32rpx;
  border-radius: 44rpx;
  margin-top: 40rpx;

  &::after {
    border: none;
  }
}
</style>
