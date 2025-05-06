<template>
  <view class="profile-container">
    <view class="profile-header">
      <view class="profile-avatar" @click="handleLogin">
        <image class="profile-avatar" :src="userInfo.avatar" mode="aspectFill"></image>
      </view>
      <view class="profile-info" @click="handleLogin">
        <view class="profile-name">{{ userInfo.nickname || "点击登录" }}</view>
        <view class="profile-id" v-if="!token">登录后享受更多功能</view>
      </view>
      <view class="profile-edit">编辑</view>
    </view>
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
      </view>
      <button type="warn" @click="logout" v-if="token">退出登录</button>
    </view>
    <login-dialog ref="loginDialog" @login-success="handleLoginSuccess"></login-dialog>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onShow } from "@dcloudio/uni-app";
import LoginDialog from "./components/LoginDialog.vue";
import { menuList } from "./data/user";
import { getToken, getUser, removeToken } from "../../utils/auth";

const token = ref(null);
const userInfo = ref({
  avatar: "",
  nickname: "",
  desc: "",
});

const loginDialog = ref(null);

const handleLogin = () => {
  if (!token.value) {
    uni.navigateTo({
      url: "/pages/login/index",
    });
  } else {
    // 选择图片
    uni.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: async res => {
        const tempFilePath = res.tempFilePaths[0];

        try {
          // 上传图片
          const uploadRes = await uni.uploadFile({
            url: "/api/user/avatar",
            filePath: tempFilePath,
            name: "avatar",
            header: {
              Authorization: `Bearer ${token.value}`,
            },
          });

          const result = JSON.parse(uploadRes.data);

          if (result.code === 0) {
            // 更新用户信息
            userInfo.value = {
              ...userInfo.value,
              avatar: result.data.url,
            };

            uni.showToast({
              title: "头像更新成功",
              icon: "success",
            });
          } else {
            uni.showToast({
              title: result.message || "上传失败",
              icon: "none",
            });
          }
        } catch (error) {
          console.error("上传头像失败:", error);
          uni.showToast({
            title: "上传失败",
            icon: "none",
          });
        }
      },
    });
  }
};

const handleLoginSuccess = userData => {
  userInfo.value = { ...userData };
  token.value = getToken();
};

const handleMenuClick = url => {
  uni.navigateTo({
    url: url,
  });
};

const logout = () => {
  removeToken();
  token.value = null;
  userInfo.value = {
    avatar: "",
    nickname: "",
    desc: "",
  };
};

const init = () => {
  token.value = getToken();
  if (token.value) {
    const user = getUser();
    if (user) {
      userInfo.value = { ...user };
    }
  }
};

onMounted(() => {
  init();
});

// 添加页面显示时的处理
onShow(() => {
  init();
});
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
.profile-logout {
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
