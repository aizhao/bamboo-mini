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
      <swiper class="model-swiper" circular autoplay interval="3000" :current="currentSwiper" @change="handleSwiperChange">
        <swiper-item v-for="(image, index) in modelImages" :key="index">
          <view class="image-container" @click="handleImageClick(index)">
            <image :src="image" mode="aspectFit" class="model-image"></image>
            <!-- 在第一张图片上添加查看3D模型的按钮 -->
            <view v-if="index === 0" class="view-3d-btn" @click.stop="goToView3D">
              <text class="view-3d-text">点击查看3D模型</text>
            </view>
          </view>
        </swiper-item>
      </swiper>
      <!-- 轮播图指示点 -->
      <view class="swiper-dots">
        <view v-for="(_, index) in modelImages" :key="index" class="dot" :class="{ active: currentSwiper === index }"></view>
      </view>

      <!-- 模型信息 -->
      <view class="model-info">
        <view class="model-header">
          <text class="model-name">{{ modelInfo.name }}</text>
          <view class="price-tag" v-if="modelInfo.price">
            <text class="price-label">参考价</text>
            <text class="price-value">¥{{ modelInfo.price }}</text>
          </view>
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
          <view class="detail-item">
            <text class="detail-label">上传时间</text>
            <text class="detail-value">{{ modelInfo.update_time }}</text>
          </view>
        </view>

        <view class="model-tags" v-if="modelInfo.tags && modelInfo.tags.length">
          <text class="tags-title">标签</text>
          <view class="tags-container">
            <text v-for="(tag, index) in tagsList" :key="index" class="tag-item">{{ tag }}</text>
          </view>
        </view>
      </view>

      <!-- 底部操作栏 -->
      <view class="action-bar">
        <button class="action-button download-btn" @click="handleDownload">
          <text class="button-icon">⬇️</text>
          <text>下载模型</text>
        </button>
        <button class="action-button share-btn" @click="handleShare">
          <text class="button-icon">↗️</text>
          <text>分享</text>
        </button>
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
const tagsList = ref([]);
const currentSwiper = ref(0);

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
function convertUTCToBeijing(utcString) {
  const date = new Date(utcString);
  // 添加8小時的毫秒數
  const beijingTime = new Date(date.getTime() + 8 * 60 * 60 * 1000);

  // 格式化成北京時間的字符串（YYYY-MM-DD HH:mm:ss）
  const year = beijingTime.getUTCFullYear();
  const month = String(beijingTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(beijingTime.getUTCDate()).padStart(2, "0");
  const hours = String(beijingTime.getUTCHours()).padStart(2, "0");
  const minutes = String(beijingTime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(beijingTime.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
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
    const response = await getModel3DById(id.value);

    if (response.code === 0 && response.data) {
      modelInfo.value = response.data;
      modelInfo.value.update_time = convertUTCToBeijing(modelInfo.value.update_time);
      tagsList.value = response.data.tags.split(",");
      // 假设模型图片存储在 thumbnail_url 中
      if (modelInfo.value.images) {
        modelImages.value = modelInfo.value.images;
      } else {
      }
    } else {
      error.value = response.message || "获取模型详情失败";
    }
  } catch (err) {
    error.value = "网络请求失败，请稍后重试";
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
  if (!modelInfo.value || !modelInfo.value.model_url) {
    uni.showToast({
      title: "模型未加载完成",
      icon: "none",
    });
    return;
  }

  console.log("detail.vue - 开始下载模型:", modelInfo.value.url);
  uni.downloadFile({
    url: modelInfo.value.model_url,
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

// 处理轮播图切换
const handleSwiperChange = e => {
  currentSwiper.value = e.detail.current;
};

// 处理图片点击
const handleImageClick = index => {
  uni.previewImage({
    urls: modelImages.value,
    current: index,
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
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 10;
  backdrop-filter: blur(5px);
}

.loading-text,
.error-text {
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 500;
}

.retry-button {
  padding: 10px 20px;
  background: linear-gradient(135deg, #2196f3, #1976d2);
  color: #fff;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
}

.model-swiper {
  height: 300px;
  background-color: #fff;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  margin: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
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

/* 轮播图指示点样式 */
.swiper-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
}

.dot.active {
  background-color: #fff;
  transform: scale(1.2);
}

.view-3d-btn {
  position: absolute;
  bottom: 30px; /* 调整位置，避免与指示点重叠 */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 122, 255, 0.8);
  padding: 8px 16px;
  border-radius: 20px;
  z-index: 2;
}

.view-3d-text {
  color: #fff;
  font-size: 14px;
}

.model-info {
  padding: 20px;
  background-color: #fff;
  margin-top: 10px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.model-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.model-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  flex: 1;
}

.price-tag {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.price-label {
  font-size: 12px;
  color: #fff;
  opacity: 0.9;
}

.price-value {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.model-description {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.description-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.description-content {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.model-details {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.detail-item {
  display: flex;
  margin-bottom: 12px;
  align-items: center;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  width: 70px;
  font-size: 14px;
  color: #666;
  background-color: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
}

.detail-value {
  flex: 1;
  font-size: 14px;
  color: #333;
  margin-left: 12px;
}

.model-tags {
  margin-bottom: 20px;
}

.tags-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 12px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  background: linear-gradient(135deg, #e9ecef, #f8f9fa);
  color: #495057;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  border: 1px solid #dee2e6;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  margin-top: 10px;
  border-radius: 12px 12px 0 0;
}

.action-button {
  flex: 1;
  margin: 0 10px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.download-btn {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: #fff;
}

.share-btn {
  background: linear-gradient(135deg, #2196f3, #1976d2);
  color: #fff;
}

.button-icon {
  margin-right: 6px;
  font-size: 16px;
}

.action-button:active {
  transform: scale(0.98);
  opacity: 0.9;
}
</style>
