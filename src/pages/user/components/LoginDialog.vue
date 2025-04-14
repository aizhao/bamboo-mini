<template>
  <uni-popup ref="popup" type="center" @change="handleChange">
    <view class="login-container">
      <view class="login-header">
        <text class="login-title">{{ isLogin ? "登录" : "注册" }}</text>
        <text class="login-close" @click="close">×</text>
      </view>

      <view class="login-content">
        <view class="login-tabs">
          <view class="tab-item" :class="{ active: isLogin }" @click="switchTab(true)">登录</view>
          <view class="tab-item" :class="{ active: !isLogin }" @click="switchTab(false)">注册</view>
        </view>

        <view class="login-form">
          <view class="form-item">
            <text class="form-label">手机号</text>
            <input class="form-input" type="number" v-model="form.phone" placeholder="请输入手机号" maxlength="11" />
          </view>

          <view class="form-item">
            <text class="form-label">密码</text>
            <input class="form-input" type="password" v-model="form.password" placeholder="请输入密码" />
          </view>

          <view class="form-item" v-if="!isLogin">
            <text class="form-label">确认密码</text>
            <input class="form-input" type="password" v-model="form.confirmPassword" placeholder="请再次输入密码" />
          </view>

          <view class="form-item" v-if="!isLogin">
            <text class="form-label">验证码</text>
            <view class="verify-code">
              <input class="form-input" type="number" v-model="form.verifyCode" placeholder="请输入验证码" maxlength="6" />
              <button class="send-code-btn" :disabled="countdown > 0" @click="sendVerifyCode">
                {{ countdown > 0 ? `${countdown}s后重试` : "获取验证码" }}
              </button>
            </view>
          </view>
        </view>

        <button class="submit-btn" @click="handleSubmit">
          {{ isLogin ? "登录" : "注册" }}
        </button>

        <view class="login-options">
          <text class="option-text" v-if="isLogin" @click="forgotPassword">忘记密码？</text>
          <text class="option-text" v-if="isLogin" @click="switchTab(false)">没有账号？立即注册</text>
          <text class="option-text" v-if="!isLogin" @click="switchTab(true)">已有账号？立即登录</text>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
import { ref, reactive, defineEmits } from "vue";

const emit = defineEmits(["login-success"]);

const popup = ref(null);
const isLogin = ref(true);
const countdown = ref(0);

const form = reactive({
  phone: "",
  password: "",
  confirmPassword: "",
  verifyCode: "",
});

const show = () => {
  if (popup.value) {
    popup.value.open("center");
  }
};

const close = () => {
  if (popup.value) {
    popup.value.close();
  }
};

const handleChange = e => {
  console.log("popup change:", e);
};

const switchTab = value => {
  isLogin.value = value;
  // 重置表单
  form.password = "";
  form.confirmPassword = "";
  form.verifyCode = "";
};

const sendVerifyCode = () => {
  if (!form.phone) {
    uni.showToast({
      title: "请输入手机号",
      icon: "none",
    });
    return;
  }

  // 模拟发送验证码
  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);

  uni.showToast({
    title: "验证码已发送",
    icon: "success",
  });
};

const handleSubmit = () => {
  if (!form.phone || !form.password) {
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
    });
    return;
  }

  if (!isLogin.value) {
    if (form.password !== form.confirmPassword) {
      uni.showToast({
        title: "两次密码输入不一致",
        icon: "none",
      });
      return;
    }

    if (!form.verifyCode) {
      uni.showToast({
        title: "请输入验证码",
        icon: "none",
      });
      return;
    }
  }

  // 模拟登录/注册成功
  const userData = {
    avatar: "/static/images/avatar-default.png",
    nickname: "竹艺爱好者",
    desc: "热爱竹编艺术的传承者",
  };

  uni.showToast({
    title: isLogin.value ? "登录成功" : "注册成功",
    icon: "success",
  });

  close();
  emit("login-success", userData);
};

const forgotPassword = () => {
  uni.showToast({
    title: "请联系客服重置密码",
    icon: "none",
  });
};

defineExpose({
  show,
  close,
});
</script>

<style scoped>
.login-container {
  width: 600rpx;
  background-color: #fff;
  border-radius: 20rpx;
  overflow: hidden;
}

.login-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
}

.login-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.login-close {
  font-size: 40rpx;
  color: #999;
  padding: 10rpx;
}

.login-content {
  padding: 30rpx;
}

.login-tabs {
  display: flex;
  margin-bottom: 40rpx;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #5a8d69;
  font-weight: 500;
}

.tab-item.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60rpx;
  height: 4rpx;
  background-color: #5a8d69;
  border-radius: 2rpx;
}

.form-item {
  margin-bottom: 30rpx;
}

.form-label {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.form-input {
  width: 100%;
  height: 80rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
}

.verify-code {
  display: flex;
  gap: 20rpx;
}

.verify-code .form-input {
  flex: 1;
}

.send-code-btn {
  width: 200rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #5a8d69;
  color: #fff;
  font-size: 24rpx;
  border-radius: 8rpx;
}

.send-code-btn[disabled] {
  background-color: #ccc;
}

.submit-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background-color: #5a8d69;
  color: #fff;
  font-size: 32rpx;
  border-radius: 44rpx;
  margin-top: 40rpx;
}

.login-options {
  display: flex;
  justify-content: space-between;
  margin-top: 30rpx;
}

.option-text {
  font-size: 24rpx;
  color: #5a8d69;
}
</style>
