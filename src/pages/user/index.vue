<template>
  <view class="profile-container">
    <views class="profile-header">
      <view class="profile-avatar" @click="handleLogin">
        <image class="avatar" :src="userInfo.avatar || '/static/images/avatar-default.png'" mode="aspectFill"></image>
      </view>
      <view class="profile-info">
        <view class="profile-name">{{ userInfo.nickname || "点击登录" }}</view>
        <view class="profile-id">{{ userInfo.desc || "登录后享受更多功能" }}</view>
      </view>
      <view class="profile-edit">编辑</view></views
    >
    <view class="profile-stats">
      <view class="profile-stat">
        <view class="profile-stat-value">12</view>
        <view class="profile-stat-label">收藏</view>
      </view>
      <view class="profile-stat">
        <view class="profile-stat-value">8</view>
        <view class="profile-stat-label">关注</view>
      </view>
      <view class="profile-stat">
        <view class="profile-stat-value">24</view>
        <view class="profile-stat-label">粉丝</view>
      </view>
    </view>
    <view class="profile-menu">
      <view class="profile-menu-item" data-id="orders" v-for="item in menuList" :key="item.id" @click="handleMenuClick(item.path)">
        <view class="profile-menu-icon">{{ item.icon }}</view>
        <view class="profile-menu-content">
          <view class="profile-menu-title">{{ item.name }}</view>
          <view class="profile-menu-desc">{{ item.desc }}</view>
        </view>
        <view class="profile-menu-arrow">></view>
      </view></view
    >
    <login-dialog ref="loginDialog" @login-success="handleLoginSuccess"></login-dialog>
  </view>
</template>

<script setup>
import { ref } from "vue";
import LoginDialog from "./components/LoginDialog.vue";
import { menuList } from "./data/user";

const userInfo = ref({
  avatar: "",
  nickname: "",
  desc: "",
});

const loginDialog = ref(null);

const handleLogin = () => {
  uni.navigateTo({
    url: "/pages/login/index",
  });
};

const handleLoginSuccess = userData => {
  userInfo.value = userData;
};

const handleMenuClick = url => {
  uni.navigateTo({
    url: url,
  });
};
</script>

<style>
.profile-container {
  padding: 15px;
  height: calc(100vh - 60px);
  overflow-y: auto;
}
.profile-header {
  display: flex;
  align-items: center;
  padding: 20px 15px;
  background: linear-gradient(135deg, #91a967, #5a8d69);
  color: white;
  border-radius: 10px;
  margin-bottom: 20px;
}
.profile-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  margin-right: 15px;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 18px;
  margin-bottom: 5px;
}

.profile-id {
  font-size: 12px;
  opacity: 0.8;
}

.profile-edit {
  color: white;
  font-size: 14px;
  opacity: 0.8;
}
.profile-stats {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: white;
  margin-bottom: 15px;
}

.profile-stat {
  text-align: center;
}

.profile-stat-value {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.profile-stat-label {
  font-size: 12px;
  color: #999;
}
.profile-menu-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
}
.profile-menu-item:last-child {
  border-bottom: none;
}
.profile-menu-icon {
  width: 24px;
  height: 24px;
  margin-right: 15px;
  color: #5a8d69;
}

.profile-menu-content {
  flex: 1;
}

.profile-menu-title {
  font-size: 14px;
  color: #333;
}

.profile-menu-desc {
  font-size: 12px;
  color: #999;
}

.profile-menu-arrow {
  color: #ccc;
}
</style>
