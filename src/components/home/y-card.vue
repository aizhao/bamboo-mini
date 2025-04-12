<template>
  <view class="card-container">
    <image class="card-image" :src="cover" mode="aspectFill"></image>
    <view class="card-content">
      <text class="card-title">{{ title }}</text>
      <text class="card-desc">{{ description }}</text>
    </view>
    <view class="article-meta">
      <span>阅读 1024</span>
      <span>2023-05-20</span>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  cover: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.card-container {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  animation: slideIn 0.6s ease-out;
  transition: all 0.3s ease;
}
.card-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.card-image {
  width: 100%;
  height: 150px;
  background-color: #eee;
  background-image: linear-gradient(45deg, #91a967, #5a8d69);
  position: relative;
  transition: all 0.3s ease;
}
.card-img::after {
  content: "竹簧工艺";
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}
.card-container:hover .card-img {
  transform: scale(1.02);
}
.card-content {
  padding: 15px;
}

.card-title {
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
}

.card-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  display: block;
}
.article-meta {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 12px;
  padding: 0 15px;
}
</style>
