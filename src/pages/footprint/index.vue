<template>
  <view class="container">
    <view class="map-container">
      <image class="map" src="/static/images/map.jpg" mode="aspectFill"></image>
      <view class="map-marker" v-for="(item, index) in locations" :key="index" :style="{ left: item.x + '%', top: item.y + '%' }">
        <view class="marker-dot"></view>
      </view>
    </view>

    <view class="location-list">
      <view class="location-item" v-for="(item, index) in locations" :key="index">
        <view class="location-icon">
          <text class="location-number">{{ index + 1 }}</text>
        </view>
        <view class="location-info">
          <text class="location-name">{{ item.name }}</text>
          <text class="location-desc">{{ item.description }}</text>
          <text class="location-date">{{ item.date }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const locations = ref([
  {
    name: "江安竹簧艺术馆",
    description: "展示竹簧技艺发展历程和代表作品",
    date: "2023-05-20",
    x: 30,
    y: 40,
  },
  {
    name: "竹簧工艺传习所",
    description: "非遗传承人技艺培训基地",
    date: "2023-06-15",
    x: 60,
    y: 50,
  },
  {
    name: "竹簧文化园",
    description: "集展示、体验、销售为一体的文化园区",
    date: "2023-07-01",
    x: 45,
    y: 70,
  },
]);
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #fff;
}

.map-container {
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
}

.map {
  width: 100%;
  height: 100%;
}

.map-marker {
  position: absolute;
  transform: translate(-50%, -50%);
}

.marker-dot {
  width: 12px;
  height: 12px;
  background-color: #5a8d69;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 10px rgba(90, 141, 105, 0.5);
  animation: pulse 2s infinite;
}

.location-list {
  background-color: #fff;
  border-radius: 10px;
}

.location-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
}

.location-icon {
  width: 30px;
  height: 30px;
  background-color: #5a8d69;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.location-number {
  color: #fff;
  font-size: 14px;
}

.location-info {
  flex: 1;
}

.location-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

.location-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
  display: block;
}

.location-date {
  font-size: 12px;
  color: #999;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
