<template>
  <view class="container">
    <view class="date-list">
      <view class="date-item" v-for="(date, index) in dates" :key="index" :class="{ active: currentDate === index }" @click="switchDate(index)">
        {{ date }}
      </view>
    </view>

    <view class="timeline">
      <view class="timeline-item" v-for="(item, index) in footprints" :key="index">
        <view class="time-point">
          <text class="time">{{ item.time }}</text>
          <view class="point"></view>
        </view>
        <view class="content-card">
          <view class="content-type">
            <text class="type-icon">{{ item.typeIcon }}</text>
            <text class="type-text">{{ item.type }}</text>
          </view>
          <view class="content-main">
            <image v-if="item.image" :src="item.image" mode="aspectFill" class="content-image"></image>
            <view class="content-info">
              <text class="content-title">{{ item.title }}</text>
              <text class="content-desc">{{ item.description }}</text>
              <view class="content-meta">
                <text class="meta-item">{{ item.location }}</text>
                <text class="meta-item">{{ item.duration }}</text>
              </view>
            </view>
          </view>
          <view class="action-bar">
            <button class="action-btn" @click="shareContent(item)">
              <text class="action-icon">🔗</text>
              分享
            </button>
            <button class="action-btn" @click="deleteFootprint(item)">
              <text class="action-icon">🗑️</text>
              删除
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const dates = ["今天", "昨天", "本周", "本月"];
const currentDate = ref(0);

const footprints = ref([
  {
    time: "14:30",
    type: "工艺展览",
    typeIcon: "🎨",
    title: "竹簧编织艺术展",
    description: "参观了江安竹簧非遗传承人的作品展览",
    location: "文化展览馆",
    duration: "1小时",
    image: "/static/images/footprints/exhibition.jpg",
  },
  {
    time: "11:20",
    type: "技艺学习",
    typeIcon: "📚",
    title: "竹簧编织基础课程",
    description: "跟随大师学习竹簧编织基本技法",
    location: "传习所",
    duration: "2小时",
    image: "/static/images/footprints/learning.jpg",
  },
  {
    time: "09:00",
    type: "文创购物",
    typeIcon: "🛍️",
    title: "竹簧工艺品选购",
    description: "挑选了一件精美的竹簧装饰画",
    location: "非遗文创店",
    duration: "30分钟",
    image: "/static/images/footprints/shopping.jpg",
  },
]);

const switchDate = index => {
  currentDate.value = index;
};

const shareContent = item => {
  uni.showActionSheet({
    itemList: ["微信好友", "朋友圈", "复制链接"],
    success: res => {
      uni.showToast({
        title: "分享成功",
        icon: "success",
      });
    },
  });
};

const deleteFootprint = item => {
  uni.showModal({
    title: "删除足迹",
    content: "确认删除这条足迹记录？",
    success: res => {
      if (res.confirm) {
        footprints.value = footprints.value.filter(f => f !== item);
        uni.showToast({
          title: "已删除",
          icon: "success",
        });
      }
    },
  });
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 15px;
}

.date-list {
  display: flex;
  background-color: #fff;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.date-item {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
  color: #666;
  position: relative;
  transition: all 0.3s ease;
}

.date-item.active {
  color: #5a8d69;
  font-weight: 500;
}

.date-item.active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background-color: #5a8d69;
  border-radius: 1px;
}

.timeline {
  position: relative;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 80px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #e9ecef;
}

.timeline-item {
  display: flex;
  margin-bottom: 20px;
  position: relative;
}

.time-point {
  width: 80px;
  padding-right: 20px;
  text-align: right;
  position: relative;
}

.time {
  font-size: 13px;
  color: #868e96;
}

.point {
  position: absolute;
  right: -5px;
  top: 50%;
  width: 10px;
  height: 10px;
  background-color: #5a8d69;
  border-radius: 50%;
  border: 2px solid #fff;
}

.content-card {
  flex: 1;
  margin-left: 20px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.content-type {
  padding: 12px 15px;
  border-bottom: 1px solid #f8f9fa;
  display: flex;
  align-items: center;
}

.type-icon {
  font-size: 16px;
  margin-right: 8px;
}

.type-text {
  font-size: 14px;
  color: #5a8d69;
  font-weight: 500;
}

.content-main {
  display: flex;
  padding: 15px;
}

.content-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-right: 15px;
}

.content-info {
  flex: 1;
}

.content-title {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
}

.content-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 10px;
  display: block;
}

.content-meta {
  display: flex;
  gap: 15px;
}

.meta-item {
  font-size: 12px;
  color: #868e96;
}

.action-bar {
  display: flex;
  padding: 12px 15px;
  border-top: 1px solid #f8f9fa;
  gap: 10px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-size: 14px;
  color: #666;
  background-color: #f8f9fa;
  border: none;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.action-icon {
  margin-right: 4px;
  font-size: 14px;
}

.action-btn:active {
  opacity: 0.8;
}
</style>
