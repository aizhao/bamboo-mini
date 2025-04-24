<template>
  <view class="container">
    <!-- 加载状态 -->
    <view v-if="loading" class="loading-container">
      <text class="loading-text">加载中...</text>
    </view>

    <!-- 错误提示 -->
    <view v-if="error" class="error-container">
      <text class="error-text">{{ error }}</text>
      <button class="retry-button" @click="retryLoad">重试</button>
    </view>

    <!-- 内容区域 -->
    <block v-if="!loading && !error">
      <!-- 图片轮播 -->
      <swiper class="model-swiper" circular autoplay interval="3000">
        <swiper-item v-for="(image, index) in modelImages" :key="index">
          <view class="image-container">
            <image :src="image" mode="aspectFill" class="model-image"></image>
            <!-- 在第一张图片上添加查看3D模型的按钮 -->
            <view v-if="index === 0" class="view-3d-btn" @click="goToView3D">
              <text class="view-3d-text">点击查看3D模型</text>
            </view>
          </view>
        </swiper-item>
      </swiper>

      <!-- 模型信息 -->
      <view class="model-info">
        <view class="model-header">
          <text class="model-name">{{ modelInfo.name }}</text>
          <text class="model-category">{{ modelInfo.category }}</text>
        </view>

        <view class="model-description">
          <text class="description-title">作品描述</text>
          <text class="description-content">{{ modelInfo.description }}</text>
        </view>

        <view class="model-details">
          <view class="detail-item">
            <text class="detail-label">作者</text>
            <text class="detail-value">{{ modelInfo.author }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">格式</text>
            <text class="detail-value">{{ modelInfo.format }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">大小</text>
            <text class="detail-value">{{ formatSize(modelInfo.size) }}</text>
          </view>
        </view>

        <view class="model-tags" v-if="modelInfo.tags && modelInfo.tags.length">
          <text class="tags-title">标签</text>
          <view class="tags-container">
            <text v-for="(tag, index) in modelInfo.tags" :key="index" class="tag-item">{{ tag }}</text>
          </view>
        </view>
      </view>

      <!-- 底部操作栏 -->
      <view class="action-bar">
        <button class="action-button" @click="handleDownload">下载模型</button>
        <button class="action-button" @click="handleShare">分享</button>
      </view>
    </block>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getModel3DById } from "@/api/model3d";
import { onLoad } from "@dcloudio/uni-app";
import { getToken } from "@/utils/auth";

const route = useRoute();
const modelInfo = ref({});
const modelImages = ref([]);
const id = ref("");
const loading = ref(true);
const error = ref("");

onLoad(options => {
  console.log("detail.vue - 页面加载，参数:", options);
  id.value = options.id;

  // 检查token
  const token = getToken();
  console.log("detail.vue - 检查token:", token ? "已存在" : "不存在");

  if (!token) {
    console.log("detail.vue - 未登录，跳转到登录页");
    uni.navigateTo({
      url: "/pages/login/index",
    });
    return;
  }

  // 获取模型详情
  fetchModelDetail();
});

// 格式化文件大小
const formatSize = size => {
  if (!size) return "0B";
  if (size < 1024) {
    return size + "B";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + "KB";
  } else {
    return (size / (1024 * 1024)).toFixed(2) + "MB";
  }
};

// 获取模型详情
const fetchModelDetail = async () => {
  loading.value = true;
  error.value = "";

  try {
    console.log("detail.vue - 开始获取模型详情，ID:", id.value);
    const response = await getModel3DById(id.value);
    console.log("detail.vue - 获取模型详情响应:", response);

    if (response.code === 0 && response.data) {
      modelInfo.value = response.data;
      // 假设模型图片存储在 thumbnail_url 中
      if (modelInfo.value.thumbnail_url) {
        modelImages.value = [modelInfo.value.thumbnail_url];
        console.log("detail.vue - 模型图片:", modelImages.value);
      } else {
        console.log("detail.vue - 模型没有缩略图");
      }
    } else {
      error.value = response.message || "获取模型详情失败";
      console.error("detail.vue - 获取模型详情失败:", response.message);
    }
  } catch (err) {
    error.value = "网络请求失败，请稍后重试";
    console.error("detail.vue - 获取模型详情异常:", err);
  } finally {
    loading.value = false;
  }
};

// 重试加载
const retryLoad = () => {
  error.value = "";
  fetchModelDetail();
};

// 跳转到3D查看页面
const goToView3D = () => {
  console.log("detail.vue - 跳转到3D查看页面，ID:", id.value);
  uni.navigateTo({
    url: `/pages/shop/view3d?id=${id.value}`,
  });
};

// 处理下载
const handleDownload = () => {
  if (!modelInfo.value || !modelInfo.value.url) {
    uni.showToast({
      title: "模型未加载完成",
      icon: "none",
    });
    return;
  }

  console.log("detail.vue - 开始下载模型:", modelInfo.value.url);
  uni.downloadFile({
    url: modelInfo.value.url,
    success: res => {
      console.log("detail.vue - 下载成功:", res);
      if (res.statusCode === 200) {
        uni.saveFile({
          tempFilePath: res.tempFilePath,
          success: saveRes => {
            console.log("detail.vue - 保存成功:", saveRes);
            uni.showToast({
              title: "下载成功",
              icon: "success",
            });
          },
          fail: err => {
            console.error("detail.vue - 保存失败:", err);
            uni.showToast({
              title: "保存失败",
              icon: "none",
            });
          },
        });
      }
    },
    fail: err => {
      console.error("detail.vue - 下载失败:", err);
      uni.showToast({
        title: "下载失败",
        icon: "none",
      });
    },
  });
};

// 处理分享
const handleShare = () => {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ["shareAppMessage", "shareTimeline"],
  });
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}

.loading-container,
.error-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 10;
}

.loading-text,
.error-text {
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
}

.retry-button {
  padding: 8px 16px;
  background-color: #007aff;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
}

.model-swiper {
  height: 300px;
  background-color: #fff;
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.model-image {
  width: 100%;
  height: 100%;
}

.view-3d-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 122, 255, 0.8);
  padding: 8px 16px;
  border-radius: 20px;
}

.view-3d-text {
  color: #fff;
  font-size: 14px;
}

.model-info {
  padding: 15px;
  background-color: #fff;
  margin-top: 10px;
}

.model-header {
  margin-bottom: 15px;
}

.model-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  display: block;
}

.model-category {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  display: block;
}

.model-description {
  margin-bottom: 15px;
}

.description-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.description-content {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.model-details {
  margin-bottom: 15px;
}

.detail-item {
  display: flex;
  margin-bottom: 10px;
}

.detail-label {
  width: 60px;
  font-size: 14px;
  color: #999;
}

.detail-value {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.model-tags {
  margin-bottom: 15px;
}

.tags-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
}

.tag-item {
  background-color: #f0f0f0;
  color: #666;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 12px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.action-bar {
  display: flex;
  justify-content: space-around;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.action-button {
  flex: 1;
  margin: 0 10px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #007aff;
  color: #fff;
  border-radius: 20px;
  font-size: 14px;
}
</style>
