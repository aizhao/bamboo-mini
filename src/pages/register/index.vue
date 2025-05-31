<template>
  <view class="register-container">
    <view class="logo">
      <image src="/static/logo.png" mode="aspectFit"></image>
    </view>
    <view class="title">注册账号</view>
    <view class="subtitle">欢迎加入竹艺商城</view>

    <!-- 注册表单 -->
    <view class="register-form">
      <view class="form-item">
        <input type="text" v-model="form.username" placeholder="请输入账号" class="input" />
      </view>
      <view class="form-item">
        <input type="text" v-model="form.phone" placeholder="请输入手机号" class="input" />
      </view>
      <view class="form-item">
        <input type="text" v-model="form.nickname" placeholder="请输入昵称" class="input" />
      </view>
      <!-- <view class="form-item verification-code">
        <input type="text" v-model="form.code" placeholder="请输入验证码" class="input" />
        <button class="code-btn" :disabled="isCounting" @click="handleSendCode">
          {{ isCounting ? `${countdown}s后重试` : "获取验证码" }}
        </button>
      </view> -->
      <view class="form-item">
        <input type="password" v-model="form.password" placeholder="请输入密码" class="input" />
      </view>
      <view class="form-item">
        <input type="safe-password" v-model="form.confirmPassword" placeholder="请确认密码" class="input" password="true" />
      </view>
    </view>

    <!-- 注册按钮 -->
    <view class="register-buttons">
      <button class="register-btn" @click="handleRegister">注册</button>
    </view>

    <!-- 其他操作 -->
    <view class="other-actions">
      <text class="action-link" @click="goToLogin">已有账号？去登录</text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { register } from "@/api/auth";

// 表单数据
const form = reactive({
  username: "",
  phone: "",
  password: "",
  confirmPassword: "",
  nickname: "",
});

// 验证码相关
const isCounting = ref(false);
const countdown = ref(60);

// 发送验证码
const handleSendCode = async () => {
  if (!form.phone) {
    uni.showToast({
      title: "请输入手机号",
      icon: "none",
    });
    return;
  }

  // 验证手机号格式
  if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    uni.showToast({
      title: "请输入正确的手机号",
      icon: "none",
    });
    return;
  }

  try {
    const res = await sendVerificationCode(form.phone);
    if (res.code === 0) {
      uni.showToast({
        title: "验证码已发送",
        icon: "success",
      });
      startCountdown();
    } else {
      uni.showToast({
        title: res.message || "发送失败",
        icon: "none",
      });
    }
  } catch (error) {
    uni.showToast({
      title: error.message || "发送失败",
      icon: "none",
    });
  }
};

// 开始倒计时
const startCountdown = () => {
  isCounting.value = true;
  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      isCounting.value = false;
    }
  }, 1000);
};

// 处理注册
const handleRegister = async () => {
  // 表单验证
  if (!form.username || !form.phone || !form.password || !form.confirmPassword || !form.nickname) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
    });
    return;
  }

  // 验证手机号格式
  if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    uni.showToast({
      title: "请输入正确的手机号",
      icon: "none",
    });
    return;
  }

  // 验证密码
  if (form.password.length < 6) {
    uni.showToast({
      title: "密码长度不能少于6位",
      icon: "none",
    });
    return;
  }

  // 验证两次密码是否一致
  if (form.password !== form.confirmPassword) {
    uni.showToast({
      title: "两次输入的密码不一致",
      icon: "none",
    });
    return;
  }

  try {
    const res = await register({
      username: form.username,
      phone: form.phone,
      password: form.password,
      nickname: form.nickname,
    });

    if (res.code === 0) {
      uni.showToast({
        title: "注册成功",
        icon: "success",
      });

      // 延迟跳转到登录页
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    } else {
      uni.showToast({
        title: res.message || "注册失败",
        icon: "none",
      });
    }
  } catch (error) {
    uni.showToast({
      title: error.message || "注册失败",
      icon: "none",
    });
  }
};

// 跳转到登录页
const goToLogin = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.register-container {
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
  margin: 60rpx 0 40rpx;

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
  margin-bottom: 40rpx;
}

.register-form {
  width: 100%;
  margin-bottom: 40rpx;
}

.form-item {
  background-color: #fff;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
}

.verification-code {
  display: flex;
  align-items: center;
  gap: 20rpx;

  .input {
    flex: 1;
  }

  .code-btn {
    width: 200rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 24rpx;
    color: #fff;
    background-color: #4caf50;
    border-radius: 8rpx;
    padding: 0;

    &[disabled] {
      background-color: #ccc;
    }
  }
}

.input {
  width: 100%;
  height: 80rpx;
  font-size: 28rpx;
}

.register-buttons {
  width: 100%;
}

.register-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  border-radius: 44rpx;
  font-size: 32rpx;
  color: #fff;
  background-color: #4caf50;
}

.other-actions {
  margin-top: 40rpx;
  display: flex;
  justify-content: center;
  width: 100%;
}

.action-link {
  font-size: 28rpx;
  color: #666;
}
</style>
